import { Router } from "express";

import {
  createAuction,
  getAuctions,
  getAuctionByIndex,
  updateAuction,
  deleteAuction,
} from "../controllers/index.js";

const router = Router();

router.post("/auction", createAuction);
router.get("/auctions", getAuctions);
router.get("/auctions/:id", getAuctionByIndex);
router.put("/auctions/:id", updateAuction);
router.delete("/auctions/:id", deleteAuction);

export default router;
