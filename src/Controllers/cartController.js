import Cart from "../Models/Cart.js";

// ! @desc    Get cart
// ! @route   GET /cart
// ! @access  private
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(cart || { items: [] });
};

// ! @desc    Create or update cart
// ! @route   POST /cart
// ! @params  items [{ productId, quantity }]
// ! @access  private : users or admin
export const createOrUpdateCart = async (req, res) => {
  try {
    const { items } = req.body;
    const { user } = req;
    const cart = await Cart.findOne({ user: user._id });
    if (cart) {
      cart.items = items;
      cart.updatedAt = new Date();
      await cart.save();
      return res.json(cart);
    } else {
      const newCart = await Cart.create({ user: user._id, items });
      res.status(201).json(newCart);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Update cart item
// ! @route   PUT /cart/:userId
// ! @params  productId, quantity
// ! @access  private : admin or owner
export const updateCartItem = async (req, res) => {
  try {
    const { user } = req;
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    if (String(user._id) !== String(cart.user) && user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this cart" });
    }

    const { items } = req.body;
    cart.items = items;
    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Delete cart
// ! @route   DELETE /cart
// ! @headers Authorization: Bearer token
// ! @access  private : admin or owner
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
