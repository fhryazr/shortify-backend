import express from "express";
import router from "./routes";
import { corsMiddleware } from "../middleware/cors";
import { apiLimiter } from "../middleware/rate-limiter";

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(apiLimiter);

app.use("/api", router)

export default app;