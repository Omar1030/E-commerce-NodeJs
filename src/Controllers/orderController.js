import Order from "../Models/Order.js";
import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";

// ! @desc    Create order
// ! @route   POST /order
// ! @headers Authorization: Bearer token
// ! @access  private
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body; // optional: if not provided, use cart
    let orderItems = [];

    if (!items || items.length === 0) {
      const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart empty" });
      }
      orderItems = cart.items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price,
      }));
    } else {
      // validate items and fetch prices
      for (const it of items) {
        const product = await Product.findById(it.product);
        if (!product) return res.status(400).json({ message: `Product ${it.product} not found` });
        orderItems.push({
          product: product._id,
          quantity: it.quantity || 1,
          price: product.price,
        });
      }
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      paymentMethod: "cash_on_delivery",
    });

    // Optionally clear cart
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Get my orders
// ! @route   GET /order/my-orders
// ! @headers Authorization: Bearer token
// ! @access  private
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.product");
  res.json(orders);
};

// ! @desc    Get all orders
// ! @route   GET /orders
// ! @headers Authorization: Bearer token
// ! @access  admin
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user").populate("items.product");
  res.json(orders);
};
