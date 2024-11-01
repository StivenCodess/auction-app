import { Router } from "express";
import { checkSchema } from "express-validator";

import {
  getProducts,
  getProductByIndex,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/index.js";

import { createProductSchema } from "../validators/product/createProductSchema.js";

const router = Router();

router.post("/product", checkSchema(createProductSchema), createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductByIndex);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
