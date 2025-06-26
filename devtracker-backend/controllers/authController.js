import User from "../models/users.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";

//import sendEmail from '../utils/sendEmail.js';
// import getResetPasswordTemplate from '../utils/emailTemplates.js';
import crypto from "crypto";

/* post:register user => api/v1/register */
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  // const { name, email, password } = req.body;
  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  // });
  const {
    name,
    email,
    password,
    avatar,
    jobTitle,
    location,
    bio,
    github,
    linkedin,
  } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
    jobTitle,
    location,
    bio,
    github,
    linkedin,
  });

  sendToken(user, 201, res);
});

/* post:login user => api/v1/login */
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email & password"), 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

/* get: logout user => api/v1/logout */
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Loged Out",
  });
});

// Get current user profile => api/v1/profile
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req?.user?._id).select("-role");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    user,
  });
});

//update user password => api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req?.user?._id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();

  res.status(200).json({
    message: "Password updated successfully",
  });
});

//update user profile => api/v1/profile/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    jobTitle: req.body.jobTitle,
    location: req.body.location,
    bio: req.body.bio,
    github: req.body.github,
    linkedin: req.body.linkedin,
  };
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
  });

  res.status(200).json({
    message: "Profile updated successfully",
    user,
  });
});

//Get all users - portfolio => api/v1/users/portfolio
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ role: { $ne: "admin" } })
    .select("-role")
    .select("-createdAt")
    .select("-updatedAt")
    .select("-__v");

  if (!users) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    users,
  });
});
//admin all users
export const getAllUsersAdmin = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find()
    .select("-createdAt")
    .select("-updatedAt")
    .select("-__v");

  if (!users) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    users,
  });
});
