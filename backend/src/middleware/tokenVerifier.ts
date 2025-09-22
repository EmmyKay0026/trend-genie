import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";
import { User } from "../types";
import { supabase } from "../config/supabaseClient";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
dotenv.config();

const userTokenVerifier = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = _req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const payload = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    _req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

const getUserFromToken = async (token: string) => {
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) throw new Error("Invalid token");
  return data.user;
};

export { userTokenVerifier, getUserFromToken };
