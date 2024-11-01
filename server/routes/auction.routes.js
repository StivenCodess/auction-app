import { Router } from "express";
import { checkSchema } from "express-validator";

import {
  createAuction,
  getAuctions,
  getAuctionByIndex,
  updateAuction,
  deleteAuction,
} from "../controllers/index.js";

import { createAuctionSchema } from "../validators/auction/createAuctionSchema.js";

const router = Router();

router.post("/auction", checkSchema(createAuctionSchema), createAuction);
router.get("/auctions", getAuctions);
router.get("/auctions/:id", getAuctionByIndex);
router.put("/auctions/:id", updateAuction);
router.delete("/auctions/:id", deleteAuction);

export default router;
