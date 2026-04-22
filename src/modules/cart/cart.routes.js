import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "./cart.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove", protect, removeFromCart);

export default router;