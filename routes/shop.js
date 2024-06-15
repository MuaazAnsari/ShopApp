const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop')

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
// route to obtain specific product details using product id
router.get('/products/:productId', shopController.getProduct);
// router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
// router.post('/cart-delete-item', shopController.deleteProductCart);
// router.post('/create-order', shopController.postOrders);
// router.get('/orders', shopController.getOrders);

module.exports = router;