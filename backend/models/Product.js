const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  strikedOffPrice: {
    type: Number
  },
  discount: {
    type: String
  },
  addToCart: {
    type: String,
    default: "Add to Bag"
  },
  addToWishlist: {
    type: String,
    default: "Add to Wishlist"
  },
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

module.exports = Product;
