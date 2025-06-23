import express from "express";
import {
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
} from "../controllers/authController.js";
import { authorizedRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

//Auth Routes
router
  .route("/register")
  .post(isAuthenticatedUser, authorizedRoles("admin"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

//User Routes
router.route("/profile").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

router.route("/users/portfolio").get(getAllUsers);

export default router;
