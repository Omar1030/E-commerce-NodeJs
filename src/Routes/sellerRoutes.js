import express from "express";
import { createProduct, updateProduct, deleteProduct, getMyProducts, getMySeller } from "../Controllers/sellerController.js";
import { protect } from "../Middleware/auth.js";
import { isSeller } from "../Middleware/role.js";

const router = express.Router();

router.use(protect);
router.get("/profile", getMySeller);
router.get("/my-products", isSeller, getMyProducts); 
router.post("/products", isSeller, createProduct); 
router.put("/products/:productId", isSeller, updateProduct);
router.delete("/products/:productId", isSeller, deleteProduct); 

export default router;
