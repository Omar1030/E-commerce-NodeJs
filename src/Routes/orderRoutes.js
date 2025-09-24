import express from "express";
import { createOrder, getMyOrders, getAllOrders } from "../Controllers/orderController.js";
import { protect } from "../Middleware/auth.js";
import { isAdmin } from "../Middleware/role.js";

const router = express.Router();

router.use(protect);

router.post("/", createOrder);
router.get("/my-orders", getMyOrders);
router.get("/", isAdmin, getAllOrders); 

export default router;
