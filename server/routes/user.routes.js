import { Router } from "express";

const router = Router();

router.post("/user");
router.get("/users");
router.get("/users/:id");
router.put("/users/:id");
router.delete("/users/:id");

export default router;
