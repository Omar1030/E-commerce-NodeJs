import express from "express";
import { listProducts, getProduct } from "../Controllers/productController.js";

const router = express.Router();

router.get(
  "/",
  async (req, res, next) => {
    next();
  },
  listProducts
);

router.get("/:productId", getProduct);

export default router;
