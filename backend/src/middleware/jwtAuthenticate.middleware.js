import { User } from "../model/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const authenticateJWT = asyncHandler( async(req,res, next) => {
    try {
        const jwtToken = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "");
        if(!jwtToken) {
            throw new ApiError(401, "Invalid token");
        }
    
        const decodedToken = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken",
        )
    
        if(!user){
            throw new ApiError(401, "Invalid token");
        }
    
        req.user =user;
        next();
    } catch (error) {
        throw new ApiError(401 , "Authentication failed");
    }
})


export {authenticateJWT};