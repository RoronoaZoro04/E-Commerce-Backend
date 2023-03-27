const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { genetrateToken } = require("../config/jwtToken");
const validateMongodbId = require('../utils/validateMongodbId');
const { genetrateRefreshToken } = require("../config/refreshToken");

//creating User
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //Creating new User
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

//login user

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //checking user existense
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await genetrateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(findUser.id, {
        refreshToken: refreshToken,
    },
    {
        new:true
    });
    res.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
    })
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: genetrateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//handle refresh token

const handleRefreshToken = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    console.log(cookie)
})

//update single user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    ); 
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

//get one user

const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//delete a use

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new :true,
            }
        )
        res.json({
            message:"User Blocked"
        })
    }catch(error){
        throw new Error(error);
    }
})
const unblockUser = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongodbId(id);
    try{
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new :true,
            }
        )
        res.json({
            message:"User Unblocked"
        })
    }catch(error){
        throw new Error(error);
    }
})

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
};
