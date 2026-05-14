import express from "express";
import { singleUpload } from "../middleware/multer.js";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router
  .route("/profile/update")
  .post(authenticateToken, singleUpload, updateProfile);
export default router;
