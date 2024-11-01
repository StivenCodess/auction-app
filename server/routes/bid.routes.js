import { Router } from "express";
import { checkSchema } from "express-validator";

import {
  createBid,
  getBids,
  getBidByIndex,
  updateBid,
  deleteBid,
} from "../controllers/index.js";

import { createBidSchema } from "../validators/bid/createBidSchema.js";

const router = Router();

router.post("/bid", checkSchema(createBidSchema), createBid);
router.get("/bids", getBids);
router.get("/bid/:id", getBidByIndex);
router.put("/bid/:id", updateBid);
router.delete("/bid/:id", deleteBid);

export default router;
