import { Router } from "express";

import {
  createBid,
  getBids,
  getBidByIndex,
  updateBid,
  deleteBid,
} from "../controllers/index.js";

const router = Router();

router.post("/bid", createBid);
router.get("/bids", getBids);
router.get("/bid/:id", getBidByIndex);
router.put("/bid/:id", updateBid);
router.delete("/bid/:id", deleteBid);

export default router;
