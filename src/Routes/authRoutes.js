import express from "express";
import { register, login, changePassword, updateProfile } from "../Controllers/authController.js";
import { protect } from "../Middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", protect, changePassword); // authenticated change
router.put("/profile", protect, updateProfile);

export default router;
