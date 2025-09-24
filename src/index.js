// Packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";

// Routes
import authRoutes from "./Routes/authRoutes.js";
import sellerRoutes from "./Routes/sellerRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";

import { notFound, errorHandler } from "./utils/errorHandler.js";

// Config
dotenv.config();

// App
const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI);

// Initialize routes
app.use("/auth", authRoutes);
app.use("/seller", sellerRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
