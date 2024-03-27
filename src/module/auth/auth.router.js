import { Router } from "express";
import * as Authcontroller  from "./auth.controller.js";
import { LogInSchema, RegisterSchema } from "./auth.validation.js";
import validation from "../../middleware/validation.js";
import { asyncHandler } from "../../services/errorHandling.js";
const router= Router();


router.post('/register',validation(RegisterSchema),Authcontroller.register)

router.post('/login',validation(LogInSchema),Authcontroller.login)
router.get('/confirmEmail/:token',asyncHandler(Authcontroller.confirmEmail))

export default router;