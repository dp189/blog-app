import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/users.model.js";
import { Blog } from "../model/blogs.model.js";
import jwt from "jsonwebtoken";
import { options } from "../constants.js";
import mongoose, { ObjectId, Types } from "mongoose";
import logger from "../utils/logger.js";


//Generate access tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.getAccessToken();
    const refreshToken = user.getRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {

    logger.error(error.message);
    res.status(500).json({ error: "Something went wrong" });
    throw new ApiError(500, "Something went wrong");
  }
};



const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {

    res.status(400).json({ error: "All fields are required."})
    throw new ApiError(400, "All fields are required.");
  }

  const userPresent = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userPresent) {

    res.status(400).json({ error: "User with email or username already exists."})
    throw new ApiError(400, "User with email or username already exists.");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  if (!user) {

    res.status(500).json({ error: "Something went wrong when creating user."})
    throw new ApiError(500, "Something went wrong when creating user.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -createdAt -updatedAt"
  );

  if (!createdUser) {

    res.status(500).json({ error: "Something went wrong when creating user."})

    throw new ApiError(500, "Something went wrong when creating user.");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
      data: {
        user: {
          ...createdUser._doc,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      },
      message: "User created successfully.",
    });
});



const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {

    res.status(400).json({ error: "Username or Email is required."})
    throw new ApiError(400, "Username or Email is required.");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {

    res.status(404).json({ error: "User does not exists."});

    throw new ApiError(404, "User does not exists.");
  }

  const isPasswordValid = await user.isPasswordValid(password);

  if (!isPasswordValid) {

    res.status(401).json({ error: "Invalid User credentials."});
    throw new ApiError(401, "Invalid User credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -createdAt -updatedAt"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      status: 200,
      data: {
        user: {
          ...loggedInUser._doc,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      },
      message: "User logged in successfully.",
    });
});



const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      status: 200,
      data: {},
      message: "User logged out successfully.",
    });
});



const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    res.status(401).json({ error: "Invalid Token"})
    throw new ApiError(401, "Invalid token");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) { 

      res.status(401).json({ error: "Invalid refresh token." });
      throw new ApiError(401, "Invalid refresh token.");
    }

    if (incomingRefreshToken != user?.refreshToken) {
      res.status(401).json({ error: "Invalid refresh token." });
      throw new ApiError(401, "Refresh token is expired or used.");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        status: 200,
        data: {
          accessToken,
          refreshToken: newRefreshToken,
          message: "Access Token refreshed.",
        },
      });
  } catch (error) {

    res.status(401).json({ error: error?.message || "Invalid refresh token"})
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});



const findAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .sort({ createdAt: -1 })
    .select("-createdAt -updatedAt");

  if (!users?.length) {

    res.status(404).json({ error : "Users not found"});
    throw new ApiError(404, "Users not found");
  }

  return res.status(200).json({
    status: 200,
    data: users,
  });
});



const addFavouriteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  const userId = req.user._id;
  
  const blog = await Blog.findById(blogId).select("-description");
  if (!blog) {

    res.status(404).json({ error: "Blog not found"});
    throw new ApiError(404, "Blog not found");
  }

  const user = await User.findById(userId);

  if(!user){
    res.status(404).json({ error: "User not found"});
    throw new ApiError(404, "User not found");
  }

  if (!user.favourites.includes(blogId)) {
    user.favourites.push(new mongoose.Types.ObjectId(blogId));
    await user.save({
      validateBeforeSave: false,
    });
  }
  return res.status(200).json({
    status: 200,
    data: blog,
    message: "Blog added to favourites.",
  });
});



const findFavourites = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select(
    "-password -refreshToken -role -createdAt -updatedAt"
  );
  if (!user) {

    res.status(404).json({ error: "User not found"});
    throw new ApiError(404, "User not found");
  }

    // Find the favorite blogs.  
  const favouriteBlogs = await User.aggregate([
    {
      $match: {
        _id: user._id,
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "favourites",
        foreignField: "_id",
        as: "favouriteBlogs",
      },
    },
    {
      $project: {
        _id: 0,

        //Modifying the return response
        favouriteBlogs: {
          $map: {
            input: "$favouriteBlogs",
            as: "blog",
            in: {
              _id: "$$blog._id",
              title: "$$blog.title",
              image: "$$blog.image",
              category: "$$blog.category",
            },
          },
       
        },
      },
    },
  ]);

  return res
    .status(200)
    .json({
      status:200,
      data:favouriteBlogs.length ? favouriteBlogs[0].favouriteBlogs : []
    });
});



const removeFavouriteBlog = asyncHandler(async (req, res) =>{
  const { blogId } = req.body;
  const userId = req.user._id;

  const blog = await Blog.findById(blogId).select("-description");
  if (!blog) {
    res.status(404).json({error: "Blog not found."});
    throw new ApiError(404, "Blog not found");
  }

  const user = await User.findById(userId);

  if(user.favourites.includes(blogId)){
    user.favourites = user.favourites.filter(favourite => favourite!= blogId)
    await user.save({
      validateBeforeSave: false,
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Blog removed from favourites.",
  });
})


export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  addFavouriteBlog,
  findFavourites,
  removeFavouriteBlog,
  
};
