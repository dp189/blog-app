import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import logger from '../utils/logger.js';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadFile = async (localFilePath) => {
    try {
       const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        logger.info("File upload to cloudinary : ", response.url)
        fs.unlinkSync(localFilePath);
        return response;
        
    }catch (error) {

        //remove the file from the locally saved temporary file.
        fs.unlinkSync(localFilePath);
        logger.error(error);
        return null;

    }
}


export { uploadFile };
