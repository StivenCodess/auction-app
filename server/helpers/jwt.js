import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const generateToken = (payload, options = {}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "11m", ...options });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw new Error("Invalid or expired token");
  }
};
