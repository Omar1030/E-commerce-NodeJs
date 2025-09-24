import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String },
  photo: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true, index: true },
  createdAt: { type: Date, default: Date.now },
  price: { type: Number, required: true, default: 0 },
});

export default mongoose.model("Product", productSchema);
