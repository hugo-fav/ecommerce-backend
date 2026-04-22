export const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied, admin only" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
