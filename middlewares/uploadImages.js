const multer = require("multer")
const sharp = require("sharp")
const path = require("path")
const asyncHandler = require("express-async-handler");

const multerStorage = multer.diskStorage({
    destination: function(req,file, cb){
        cb (null, path.join(__dirname, "../public/images"))
    },
    filename : function(req,file,cb){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * le9);
        cb(null, file.fieldname + "-" + unique + ".jpg")

    }
})

const multerFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb({
            message:"Unsupported file format"
        },false)
    }
}

const uploadPhoto = multer({
    storage : multerStorage,
    fileFilter: multerFilter,
    limits: {fieldSize:2000000},
})
 
const productImgResize = async (req, res, next)=>{
    if(!req.files)return next();
    await Promise.all(
        req.files.map(async(file)=>{
            await sharp(file.path)
            .resize(300,300)
            .toFormat("jpeg")
            .jpeg({quality:90})
            .toFile(`public/images/products/${file.filename}`);
        })
    )
    next();
}


const blogImgResize = async (req, res, next)=>{
    if(!req.files)return next();
    await Promise.all(
        req.files.map(async(file)=>{
            await sharp(file.path)
            .resize(300,300)
            .toFormat("jpeg")
            .jpeg({quality:90})
            .toFile(`public/images/blogs/${file.filename}`);
        })
    )
    next();
}

const uploadImages = asyncHandler(async(req,res)=>{
    console.log(req.files);
})

module.exports = {multerStorage, uploadPhoto, multerFilter, productImgResize, blogImgResize, uploadImages}