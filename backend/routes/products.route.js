const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
});

// POST - Create a new product
router.post("/", async (req, res) => {
  const { imageUrl, brand, title, price, category } = req.body;

  if (!imageUrl || !brand || !title || !price || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
});

// PUT - Update a product
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
});

// DELETE - Remove a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
});

module.exports = router;
