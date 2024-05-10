import { Router } from "express";
import  * as messageController from "./message.controller.js";
import auth from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
const router= Router();

router.get('/',asyncHandler(auth),messageController.getmessage);
router.post('/sendMessage/:recieverId',fileUpload(fileValidation.file).single('pdf'),asyncHandler(messageController.sendMessage));

export default router;