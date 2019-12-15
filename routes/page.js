const express = require('express');

const path = require('path');

const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname,'../', 'views', 'product.html')); //path.join() concatena o caminho
});

module.exports = routes;