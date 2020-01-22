const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin/add-product', adminController.getAddProduct);

router.get('/admin/products', adminController.getProducts);

router.post('/admin/add-product', adminController.postAddProduct);

router.get('/admin/edit-product/:productId', adminController.getEditProduct);

router.post('/admin/edit-product', adminController.postEditProduct);

router.post('/admin/delete-product', adminController.postDeleteProduct);

module.exports = router;
