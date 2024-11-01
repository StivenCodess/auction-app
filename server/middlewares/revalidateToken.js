import jwt from "jsonwebtoken";

import { response } from "express";
import { verifyToken } from "../helpers/jwt.js";

export const revalidateToken = (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) return res.status(401).json({ ok: false, error: "Not Token" });

  try {
    const { name, uid } = verifyToken(token);

    req.name = name;
    req.uid = uid;
  } catch (error) {
    return res.status(401).json({ ok: false, error: "No valid Token" });
  }

  next();
};
