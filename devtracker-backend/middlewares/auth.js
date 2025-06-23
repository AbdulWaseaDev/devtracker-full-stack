import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resouce", 401));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decode.id);
  next();
});

export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`,
          403,
        ),
      );
    }

    next();
  };
};
