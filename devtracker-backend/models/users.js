import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    jobTitle: {
      type: String,
      default: "Web Developer",
    },
    location: {
      type: String,
      default: "Multan, Pakistan",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio cannot exceed 250 characters"],
    },
    github: {
      type: String,
      validate: {
        validator: (v) =>
          /^https?:\/\/(www\.)?github\.com\/[A-z0-9_-]+\/?$/.test(v),
        message: (props) => `${props.value} is not a valid GitHub URL!`,
      },
    },
    linkedin: {
      type: String,
      validate: {
        validator: (v) =>
          /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/.test(v),
        message: (props) => `${props.value} is not a valid LinkedIn URL!`,
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

// Password Encryption
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 15);
});

// Return JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT__EXPIRES_TIME,
  });
};

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
