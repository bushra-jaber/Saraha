import { Router } from "express";

import  * as userController from "./user.controller.js";
import auth from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router= Router();
router.get('/profile',asyncHandler(auth),asyncHandler(userController.profile))

export default router;