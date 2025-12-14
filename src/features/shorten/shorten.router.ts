import { Router } from "express";
import { ShortenController } from "./shorten.controller";
import { validate, validateAll } from "../../middleware/validate";
import { getShortenSchema } from "./dtos/get-shorten.dto";
import { createShortenSchema } from "./dtos/create-shorten.dto";
import { idParamSchema, shortCodeParamSchema } from "./dtos/shorten-response.dto";


const router = Router();
const controller = new ShortenController();

router.get("/", validate(getShortenSchema, "query"), controller.getLinks)
router.post("/", validate(createShortenSchema, "body"), controller.createLink)
router.patch("/:id", validateAll({ params: idParamSchema, body: createShortenSchema }), controller.updateLink)
router.delete("/:shortCode", validate(shortCodeParamSchema, "params"), controller.deleteLink)

export default router;