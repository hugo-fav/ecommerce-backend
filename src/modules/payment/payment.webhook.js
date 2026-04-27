import express from "express";
import Order from "../../models/Order.js";
import crypto from "crypto";

const router = express.Router();

// IMPORTANT --- use raw body parser for webhook route
router.post(
  "/",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }, // Store raw body for later use in signature verification
  }),
  async (req, res) => {
    // Handle the webhook event here

    try {
      // 1. Verify the webhook signature if your payment gateway provides one
      // (this step is crucial for security to ensure the request is from your payment gateway)
      const hash = crypto
        .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY) // Replace with your actual payment gateway secret key
        .update(req.rawBody.toString())
        .digest("hex");

      const signature = req.headers["x-paystack-signature"]; // Replace with actual header name from your payment gateway

      if (hash !== signature) {
        return res.status(400).send("Invalid signature");
      }

      //   2. Process the webhook event
      const event = req.body; // Access the parsed JSON body

      if (event.event === "charge.success") {
        const reference = event.data.reference;

        const order = await Order.findOne({ paymentReference: reference });

        if (!order) {
          return res.sendStatus(200); // Acknowledge the webhook event
        }

        order.isPaid = true;
        order.paidAt = new Date();

        await order.save();

        console.log("payment verified by webhook");
        console.log("🔥 Webhook hit");
        console.log("EVENT:", req.body.event);
      }
      res.sendStatus(200);
    } catch (error) {
      console.error("Error handling webhook event:", error);
      return res.status(500).send("Internal Server Error");
    }
  },
);

export default router;
