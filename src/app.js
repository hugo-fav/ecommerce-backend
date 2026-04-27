import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
// import webhookRoutes from "./modules/payment/payment.webhook.js";
import { protect } from "./middleware/auth.middleware.js";
import { isAdmin } from "./middleware/admin/admin.middleware.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import productRoutes from "./modules/product/product.route.js";
import orderRoutes from "./modules/order/order.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js";

const app = express();

app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl === "/api/payment/webhook") {
    return next(); // ✅ skip JSON parsing for webhook
  }
  express.json()(req, res, next);
});
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
// app.use("/api/webhook", webhookRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "you are authorized to access this route" });
});
app.get("/api/admin", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

export default app;
