import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Seller from "../Models/Seller.js";

const signToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// ! @desc    Register new user
// ! @route   POST /auth/register
// ! @params  name, email, password, role
// ! @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password, role: role || "user" });

    // If role is seller, create a Seller document linked to user
    if (user.role === "seller") {
      await Seller.create({ user: user._id, name: user.name });
    }

    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Login user
// ! @route   POST /auth/login
// ! @params  email, password
// ! @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Change password
// ! @route   PUT /auth/change-password
// ! @params  oldPassword, newPassword
// ! @headers Authorization: Bearer token
// ! @access  Private
/* => change password for authenticated users (not "forget password" flow) */
export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    const match = await user.comparePassword(oldPassword);
    if (!match) return res.status(400).json({ message: "Old password incorrect" });
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password changed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ! @desc    Update profile
// ! @route   PUT /auth/profile
// ! @params  name, email
// ! @headers Authorization: Bearer token
// ! @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
