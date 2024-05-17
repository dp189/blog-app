import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadFile } from "../utils/fileUpload.js";
import { Blog } from "../model/blogs.model.js";
import { Types } from "mongoose"



const isValidObjectId = (id) => {
  return Types.ObjectId.isValid(id);
};

//controller configuration
const createBlog = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;
  console.log(req.files);

  if (
    [title, category, description].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are important");
  }

  const imageUrl = req.files?.image[0]?.path;

  if (!imageUrl) {
    throw new ApiError(400, "Cover Image is required.");
  }

  const image = await uploadFile(imageUrl);

  if (!image) {
    throw new ApiError(400, "Cover Image is required.");
  }

  const blog = await Blog.create({
    title,
    image: image.url,
    category,
    description
  });

  const createdBlog = await Blog.findById(blog._id)
  console.log(createBlog);

  if(!createBlog){
    throw new ApiError(500, "Something went wrong while creating blog");
  }

  return res.status(201).json({
    status : "201 created",
    data : createdBlog
  })

});



const findAllBlogs = asyncHandler ( async (req,res) => {
  
  

  const blogs = await Blog.find().sort({createdAt : -1}).select(
    "-description")
  

  if(!blogs){
    throw new ApiError(400, "No blogs found")
  }

  return res.status(200).json({
    status: "200 OK",
    data : blogs  })

})


const findAllBlogsByCategory = asyncHandler ( async (req,res) => {

  const {category} = req.params;
  

  const blogs = await Blog.find({ category : category}).sort({createdAt : -1})

  if(!blogs){
    throw new ApiError(400, "No blogs found")
  }

  return res.status(200).json({
    status: "200 OK",
    data : blogs  })


})

//find blog by id

const findBlogsById = asyncHandler ( async (req,res) => {

  const { blogId } = req.params;

  if (!isValidObjectId(blogId)) {
    throw new ApiError(400, "Invalid blogId");
  }


  const blog = await Blog.findById(blogId)

  if(!blog){
    throw new ApiError(400, "Blog not found")
  }

  return res.status(200).json({
    status: "200 OK",
    data: blog
  });

})


//delete blog by id
const deleteBlogById = asyncHandler ( async (req, res) => {

  const { blogId } = req.params;

  if (!isValidObjectId(blogId)) {
    throw new ApiError(400, "Invalid blogId");
  }


  const deleteStatus = await Blog.findByIdAndDelete(blogId);

  if(!deleteStatus){
    throw new ApiError(400, "Blog cannot be deleted")
  }

  return res.status(204).json({
    status: "204 No Content"
});
})


//update blog by id
const updateBlogById = asyncHandler ( async (req,res) => {

  

  const { blogId } = req.params;
  
  if (!isValidObjectId(blogId)) {
    // throw new ApiError(400, "Invalid blogId");
    return res.status(400).json({
      message: "Invaid Blog Id"
    })
  }
  
  const updateData = req.body;
  const imageUrl = req.files?.image.path;
  
  if(imageUrl){
    const image = await uploadFile(imageUrl)
    updateData = {...updateData, image: image.url}
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogId,updateData,{ new : true})

  if(!updatedBlog){
    throw new ApiError(404, "Blog not found")
  }

  return res.status(200).json({
    status: "200 OK",
    data: updatedBlog
  })

})


export { createBlog, findAllBlogs, findAllBlogsByCategory, findBlogsById, deleteBlogById, updateBlogById };