import Cart from "../../models/cart.js";
import Product from "../../models/products.js";

// Get user cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.json(cart);
};

//  Add item to cart
export const addToCart = async (req, res) => {
  const { productId, name, price, image, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [],
    });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      name,
      price,
      image,
      quantity,
    });
  }

  await cart.save();
  res.json(cart);
};

// update cart item quantity
export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (existingItemIndex >= 0) {
    cart.items[existingItemIndex].quantity = quantity;
    await cart.save();
    res.json(cart);
  } else {
    return res.status(404).json({ message: "Item not found in cart" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );
  if (existingItemIndex >= 0) {
    cart.items.splice(existingItemIndex, 1);
    await cart.save();
    res.json(cart);
  } else {
    return res.status(404).json({ message: "Item not found in cart" });
  }
};
