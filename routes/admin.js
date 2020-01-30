const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/admin/products', isAuth, adminController.getProducts);

router.get('/admin/add-product', isAuth, adminController.getAddProduct);

router.post('/admin/add-product', isAuth, adminController.postAddProduct);

router.get('/admin/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/admin/edit-product', isAuth, adminController.postEditProduct);

router.post('/admin/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
