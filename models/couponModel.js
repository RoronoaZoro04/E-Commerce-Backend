const mongoose = require('mongoose'); 

var couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    expiry:{
        type:Date,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
});

module.exports = mongoose.model('Coupon', couponSchema);