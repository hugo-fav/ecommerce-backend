import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { isAdmin } from "../../middleware/admin/admin.middleware.js";

const router = express.Router();

// Public route to get all products
router.get("/", getProducts);

// Admin routes
router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
