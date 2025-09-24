export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin only" });
};

export const isSeller = (req, res, next) => {
  if (req.user && (req.user.role === "seller" || req.user.role === "admin")) return next();
  return res.status(403).json({ message: "Seller only" });
};
