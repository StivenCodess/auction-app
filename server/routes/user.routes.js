import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserByIndex,
  updateUser,
  deleteUser,
} from "../controllers/index.js";

const router = Router();

router.post("/user", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserByIndex);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
