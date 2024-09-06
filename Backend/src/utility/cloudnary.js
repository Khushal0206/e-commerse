// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'dfsfms3sp', 
  api_key: '438493993389536', 
  api_secret: '1QgRDi3C7iglfydzt-TiRZGECws' 
});
const uploadCloudinary =async(localFilePath)=>{

try {
    // console.log(localFilePath)
      const response =   await cloudinary.uploader.upload(localFilePath,
          { folder: 'uploads', 
          use_filename: true  }, 
          function(error, result) {
            
           });
          // console.log(response)
            return response
    
} catch (error) {
    // next(error)
}
}
module.exports = uploadCloudinary