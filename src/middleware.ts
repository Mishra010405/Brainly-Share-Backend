import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      return res.status(403).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(header, JWT_PASSWORD) as { id: string };

    // attach userId to request
    (req as any).userId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
};