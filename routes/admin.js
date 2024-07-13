const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

//Below middleware is for Route protection. ie no one can access these routes without logging in
const isAuth = require('../middlewares/isAuth');

// There can be same path but the method( GET or POST) needs to be different

// GET requests to /admin/add-product
router.get('/add-product', isAuth, adminController.getAddProduct);

// // POST requests to /admin/add-product
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/products', isAuth, adminController.deleteProduct);

// // GET requests to /admin/products
router.get('/products', isAuth, adminController.getProducts);


module.exports = router;