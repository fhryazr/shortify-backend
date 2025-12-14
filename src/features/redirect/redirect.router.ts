import { Router } from "express";
import { RedirectController } from "./redirect.controller";
import { validate } from "../../middleware/validate";
import { shortCodeParamSchema } from "../shorten/dtos/shorten-response.dto";


const router = Router();
const controller = new RedirectController();

router.get("/:shortCode", validate(shortCodeParamSchema, "params"), controller.handleRedirect);

export default router;