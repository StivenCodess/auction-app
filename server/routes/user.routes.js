import { Router } from "express";
import { checkSchema } from "express-validator";

import {
  registerUser,
  getUsers,
  getUserByIndex,
  updateUser,
  deleteUser,
  loginUser,
  revalidateTokenController,
} from "../controllers/index.js";

import { revalidateToken } from "../middlewares/revalidateToken.js";

import { createUserSchema } from "../validators/user/createUserSchema.js";
import { loginSchema } from "../validators/user/loginSchema.js";

const router = Router();

router.post("/user", checkSchema(createUserSchema), registerUser);
router.post("/user/login", checkSchema(loginSchema), loginUser);

router.get("/users", getUsers);
router.get("/users/:id", getUserByIndex);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/user/renew", revalidateToken, revalidateTokenController);

export default router;
