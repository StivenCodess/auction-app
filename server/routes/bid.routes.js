import { Router } from "express";

const router = Router();

router.post("/bid");
router.get("/bids");
router.get("/bid/:id");
router.put("/bid/:id");
router.delete("/bid/:id");

export default router;
