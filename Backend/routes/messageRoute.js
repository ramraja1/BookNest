import express from "express";
import { messageController } from "../controllers/messgaeControler.js";

const router = express.Router();

router.post("/messages",messageController);

export default router;