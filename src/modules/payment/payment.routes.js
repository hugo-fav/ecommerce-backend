import express from "express";
import { initializePayment, verifyPayment } from "./payment.controller.js";
import webhookRoutes from "./payment.webhook.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/initialize", protect, initializePayment);
router.post("/verify", protect, verifyPayment);
router.use("/webhook", webhookRoutes);
export default router;
