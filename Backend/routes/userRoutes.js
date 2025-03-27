import express from "express";
import { protect} from "../middleware/authMiddleware.js";

import { updateProfile } from "../controllers/userController.js";
import {fetchData} from "../controllers/userDataControler.js"
const router = express.Router();

router.get("/dashboard",protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.id} to the dashboard!` });
});

router.get("/profile",fetchData);

// ✅ Profile update route
router.put("/update-profile",updateProfile);



export default router;
