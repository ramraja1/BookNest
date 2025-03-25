import express from "express";
import { protect} from "../middleware/authMiddleware.js";

import { updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/dashboard",protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.id} to the dashboard!` });
});

// ✅ Profile update route
router.put("/update-profile/:id",protect, updateProfile);



export default router;
