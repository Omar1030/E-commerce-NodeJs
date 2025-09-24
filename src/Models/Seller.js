import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Seller", sellerSchema);
