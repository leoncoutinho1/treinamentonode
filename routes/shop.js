const express = require('express');

//const path = require('path');

const router = express.Router();

const shopController = require('../controllers/shop');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

router.get('*', adminController.logHour);
router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.get('/orders', isAuth, shopController.getOrders);

router.post('/create-order', isAuth, shopController.postOrder);

module.exports = router;