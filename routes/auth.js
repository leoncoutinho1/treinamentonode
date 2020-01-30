const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);

router.get('/signup', authController.getSignUp);

router.post('/signup', authController.postSignUp);

module.exports = router;