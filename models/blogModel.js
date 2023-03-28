const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
       
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default:0,
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isDisliked:{
        type:Boolean,
        default:false,
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    dislikes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScrznPDRn2EHMf1oYbzFHA4uhwYuT8RXvsEg&usqp=CAU",
    },
    author:{
        type:String,
        default:"Admin",
    },
},
    {
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        },
        timestamps:{
            virtuals:true,
        },
    },
);

module.exports = mongoose.model('Blog', blogSchema);