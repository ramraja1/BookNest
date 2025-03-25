import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadProfileImage , updateProfile} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js"; // Import authentication middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Secuzre profile upload route
router.put("/upload-profile", protect, upload.single("image"), updateProfile);

export default router;
