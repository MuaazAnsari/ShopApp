const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');
const isAuth = require('../middlewares/isAuth');


router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
// route to obtain specific product details using product id
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.post('/cart-delete-item', isAuth, shopController.deleteProductCart);
router.post('/create-order', isAuth, shopController.postOrders);
router.get('/orders', isAuth, shopController.getOrders);

module.exports = router;