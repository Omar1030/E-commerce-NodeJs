import Seller from "../Models/Seller.js";
import Product from "../Models/Product.js";

// ! @desc    Get my seller profile
// ! @route   GET /seller/profile
// ! @access  Private
export const getMySeller = async (req, res) => {
  // gets seller profile for current user
  const seller = await Seller.findOne({ user: req.user._id });
  if (!seller) return res.status(404).json({ message: "Seller profile not found" });
  res.json(seller);
};

// ! @desc    Create product
// ! @route   POST /seller/products
// ! @params  name, description, photo, price
// ! @headers Authorization: Bearer token
// ! @access  Private
// ! => Only seller can create product (seller must exist)
export const createProduct = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller) return res.status(403).json({ message: "Create seller profile first" });

    const { name, description, photo, price } = req.body;
    const product = await Product.create({ name, description, photo, price, seller: seller._id });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Update product
// ! @route   PUT /seller/products/:productId
// ! @params  name || description || photo || price
// ! @headers Authorization: Bearer token
// ! @access  Private
export const updateProduct = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller) return res.status(403).json({ message: "No seller profile" });

    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (String(product.seller) !== String(seller._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Delete product
// ! @route   DELETE /seller/products/:productId
// ! @headers Authorization: Bearer token
// ! @access  Private
export const deleteProduct = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (String(product.seller) !== String(seller._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    await product.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Get my products
// ! @route   GET /seller/products
// ! @headers Authorization: Bearer token
// ! @access  Private
export const getMyProducts = async (req, res) => {
  try {
    const seller = await Seller.findOne({ user: req.user._id });
    if (!seller) return res.status(404).json({ message: "Seller profile not found" });
    const products = await Product.find({ seller: seller._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
