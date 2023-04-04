const mongoose = require('mongoose'); 

var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        },
    brand:{
        type:String,
        required:true,
    },
    quantity: {
        type:Number,
        required:true,
        select:false,
    },
    sold:{
        type:Number,
        default:0,
        select:false,
    },
    images:[],
    color:[],
    tags:[],
    ratings:[
        {
            star: Number,
            comment: String, 
            postedby:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
        },
    ],
    totalrating:{
        type:String,
        default:0,
    }
},
{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);