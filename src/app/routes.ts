import { Request, Response, Router } from "express";
import shortenRouter from "../features/shorten/shorten.router"

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
})

router.use("/links", shortenRouter);

export default router;