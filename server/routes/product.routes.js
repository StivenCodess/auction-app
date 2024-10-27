import { Router } from "express";
import {
  getProducts,
  getProductByIndex,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./../controllers/product.controller.js";

const router = Router();

router.post("/product", createProduct);
router.get("/products", getProducts);
router.get("/products/:id", getProductByIndex);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
