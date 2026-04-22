import Product from "../../models/products.js";

// get all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Create a new product (ADMIN)
export const createProduct = async (req, res) => {
  const { name, description, price, image, countInStock } = req.body;

  const product = new Product({
    name,
    description,
    price,
    image,
    countInStock,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Update a product (ADMIN)
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, description, price, image, countInStock } = req.body;

  product.name = name;
  product.description = description;
  product.price = price;
  product.image = image;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
};

// Delete a product (ADMIN)
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();
  res.json({ message: "Product deleted successfully" });
};
