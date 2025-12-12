import { Router } from "express";
import { ShortenController } from "./shorten.controller";


const router = Router();
const controller = new ShortenController();

router.get("/", controller.getLinks)
router.post("/", controller.createLink)
router.patch("/:id", controller.updateLink)

export default router;