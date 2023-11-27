const express = require("express");
const router = express.Router();

const { getAllProducts, getProductById, filterProducts, sortProducts } = require("../controllers/products.controller");

// Route to fetch all products (paginated, sorted, or unsorted)
router.get('/', getAllProducts);

// Route to filter products based on query parameters
router.get('/filter', filterProducts);

// Route to sort and filter products based on query parameters
router.get('/sort', sortProducts);

// Route to fetch a product by its ID
router.get('/:id', getProductById);

module.exports = router;
