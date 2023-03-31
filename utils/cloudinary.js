const cloudinary = require("cloudinary")
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

const cloudinaryUploadImg = async(fileToUploads)=>{
    return new Promise((resolve)=>{
        cloudinary.UploadStream.upload(fileToUploads, (result)=>{
            resolve(
                {
                    url: result.secure.url,
                },
                {
                    resource_type: "auto",
                }
            )
        })
    })
}
module.exports = cloudinaryUploadImg