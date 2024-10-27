import { Router } from "express";

const router = Router();

router.post("/auction");
router.get("/auctions");
router.get("/auctions/:id");
router.put("/auctions/:id");
router.delete("/auctions/:id");

export default router;
