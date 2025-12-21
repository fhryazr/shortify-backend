import { User } from "better-auth";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
export { };

import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = session.user;
  next();
};