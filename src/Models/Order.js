import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1, min: 1 },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
  paymentMethod: { type: String, enum: ["cash_on_delivery"], default: "cash_on_delivery" } // no online payment
});

export default mongoose.model("Order", orderSchema);
