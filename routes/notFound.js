const express = require('express');

//const path = require('path');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('*', adminController.notFound);

module.exports = router;