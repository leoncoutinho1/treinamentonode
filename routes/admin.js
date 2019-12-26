const express = require('express');

//const path = require('path');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/admin/add-product', adminController.getAddProduct);

router.get('/admin/products', adminController.getProducts);

router.post('/admin/add-product', adminController.postAddProduct);

module.exports = router;
