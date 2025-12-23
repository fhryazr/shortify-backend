import express from "express";
import router from "./routes";
import { apiLimiter } from "../middleware/rate-limiter";
import cors from "cors";

import { auth } from "../lib/auth";
import { toNodeHandler } from "better-auth/node";

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:3000"].filter(Boolean),
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(apiLimiter);

app.use("/api", router)

export default app;