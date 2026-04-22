import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  markAsDelivered,
} from "./order.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { isAdmin as admin } from "../../middleware/admin/admin.middleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/allorders").get(protect, admin, getAllOrders);
router.route("/:id/deliver").put(protect, admin, markAsDelivered);

export default router;
