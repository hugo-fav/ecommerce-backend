import Cart from "../../models/cart.js";
import Order from "../../models/Order.js";

// create order from cart
export const createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // calculate total price
  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const order = new Order({
    user: req.user._id,
    orderItem: cart.items,
    totalPrice,
  });

  const createdOrder = await order.save();

  // Clear the cart
  cart.items = [];
  await cart.save();

  res.status(201).json(createdOrder);
};

// get logged in user orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
};

// get all orders (admin)
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");

  res.json(orders);
};

// Mark order as delivered (admin)
export const markAsDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.isDelivered = true;
  await order.save();

  res.json({ message: "Order marked as delivered" });
};
