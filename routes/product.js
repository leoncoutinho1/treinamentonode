const express = require('express');

const path = require('path');

const products = [];

const routes = express.Router();

routes.get('/add-product', (req,res,next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

routes.post('/product', (req, res, next) => {
    console.log(req.body.title);                //recupera o title digitado no form pelo body da request
    res.redirect('/');
});

exports.routes = routes;
exports.products = products;