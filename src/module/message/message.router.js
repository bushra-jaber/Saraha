import { Router } from "express";
import  * as messageController from "./message.controller.js";
import auth from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router= Router();

router.get('/',asyncHandler(auth),messageController.getmessage);
router.post('/sendMessage/:recieverId',messageController.sendMessage);

export default router;