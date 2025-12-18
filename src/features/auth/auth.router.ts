import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequestBody } from "../../middleware/validate";
import { authSchema } from "./dtos/auth-response.dto";


const router = Router();
const authController = new AuthController();

router.post("/signup", validateRequestBody(authSchema), authController.signUp);
router.post("/signin", validateRequestBody(authSchema.partial()), authController.signIn);

export default router;