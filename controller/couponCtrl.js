const Coupon = require("../models/couponModel")
const validateMonngodbId = require("../utils/validateMongodbId")
const asyncHandler = require("express-async-handler")

const createCoupon = asyncHandler(async(req,res)=>{
    try{
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon)
    }catch(error){
        throw new Error(error)
    }
})

const getAllCoupons = asyncHandler(async(req,res)=>{
    try{
        const Coupons = await Coupon.find();
        res.json(Coupons)
    }catch(error){
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMonngodbId(id)
    try{
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new:true,
        });
        res.json(updateCoupon)
    }catch(error){
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMonngodbId(id);
    try{
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon)
    }catch(error){
        throw new Error(error)
    }
})
module.exports = {createCoupon, getAllCoupons, updateCoupon, deleteCoupon}