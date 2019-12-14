const express = require('express');

const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'../', 'views', 'product.html')); //path.join() concatena o caminho
});

module.exports = router;