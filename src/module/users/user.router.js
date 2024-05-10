import { Router } from "express";

import  * as userController from "./user.controller.js";
import auth from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
const router= Router();
router.get('/profile',asyncHandler(auth),asyncHandler(userController.profile))
router.patch('/uploadFile',asyncHandler(auth),fileUpload(fileValidation.file).single('pdf'),asyncHandler(userController.uploadFile))

export default router;