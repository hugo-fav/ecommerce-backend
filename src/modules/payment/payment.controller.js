import axios from "axios";
import Order from "../../models/Order.js";

// Initialize payment for an order
export const initializePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Initialize payment with your payment gateway
    const response = await axios.post(
      // Replace with your actual payment gateway URL
      `${process.env.PAYMENT_BASE_URL}/transaction/initialize`,
      {
        email: req.user.email,
        amount: order.totalPrice * 100, // Convert to smallest currency unit
      },
      //   Replace with your actual payment gateway key
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    // Extract necessary data from the payment gateway response
    const data = response.data.data;

    // Save the payment reference in the order for later verification
    order.paymentReference = data.reference;
    await order.save();

    res.json({
      message: "Payment initialized successfully",
      paymentUrl: data.authorization_url, // URL to redirect user for payment
      reference: data.reference, // Payment reference for verification
    });
  } catch (error) {
    console.error("Error initializing payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify payment after user completes payment
export const verifyPayment = async (req, res) => {
  try {
    const { reference, orderId } = req.body;

    // Verify payment with your payment gateway
    const response = await axios.get(
      // Replace with your actual payment gateway URL
      `${process.env.PAYMENT_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = response.data.data;

    // If payment is successful, update the order status
    if (data.status === "success") {
      const order = await Order.findById(orderId);

      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = reference;

      await order.save();

      // Return success response with order details
      return res.json({
        message: "Payment verified successfully",
        order,
      });
    }

    // If payment verification fails, return an error
    res.status(400).json({ message: "Payment verification failed" });
  } catch (error) {
    // console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
