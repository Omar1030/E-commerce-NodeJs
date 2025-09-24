import Product from "../Models/Product.js";
import Seller from "../Models/Seller.js";

// ! @desc    List products
// ! @route   GET /products
// ! @access  public
export const listProducts = async (req, res) => {
  try {
    const { name, sellerName, price_gte, price_lte } = req.query;

    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (price_gte || price_lte) {
      filter.price = {};
      if (price_gte) filter.price.$gte = Number(price_gte);
      if (price_lte) filter.price.$lte = Number(price_lte);
    }

    let products;
    if (sellerName) {
      const sellers = await Seller.find({ name: { $regex: sellerName, $options: "i" } });
      const sellerIds = sellers.map((s) => s._id);
      filter.seller = { $in: sellerIds };
      products = await Product.find(filter).populate("seller", "name -_id").select("-__v");
    } else {
      products = await Product.find(filter).populate("seller", "name -_id").select("-__v");
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Get product
// ! @route   GET /products/:productId
// ! @access  public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate("seller");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
