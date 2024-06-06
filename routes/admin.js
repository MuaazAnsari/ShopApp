const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products')

// There can be same path but the method( GET or POST) needs to be different

// GET requests to /admin/add-product
router.get('/add-product', productsController.getAddProduct);

// POST requests to /admin/add-product
router.post('/add-product', productsController.postAddProduct);

module.exports = router;