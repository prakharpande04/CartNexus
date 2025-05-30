const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route to create a new product
router.post("/api/product/create", productController.createProduct);
// Route to get all products
router.get("/api/products", productController.getProducts);

module.exports = router;