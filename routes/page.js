const express = require('express');

//const path = require('path');

const router = express.Router();

const productsController = require('../controllers/product');
const adminController = require('../controllers/admin');

router.get('*', adminController.logHour);
router.get('/', productsController.getProducts);

//router.get('', adminController.notFound);

module.exports = router;