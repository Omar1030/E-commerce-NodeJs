import express from "express";
import { getCart, createOrUpdateCart, updateCartItem, clearCart } from "../Controllers/cartController.js";
import { protect } from "../Middleware/auth.js";

const router = express.Router();

router.use(protect); 

router.get("/", getCart);
router.post("/", createOrUpdateCart); 
router.put("/:userId", updateCartItem); 
router.delete("/", clearCart);

export default router;
