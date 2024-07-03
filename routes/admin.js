const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin')

// There can be same path but the method( GET or POST) needs to be different

// GET requests to /admin/add-product
router.get('/add-product', adminController.getAddProduct);

// // POST requests to /admin/add-product
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/products', adminController.deleteProduct);

// // GET requests to /admin/products
router.get('/products', adminController.getProducts);


module.exports = router;