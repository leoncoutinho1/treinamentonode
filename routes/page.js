const express = require('express');

const path = require('path');

const routes = express.Router();

const prod = require('./product');

routes.get('/', (req, res, next) => {
    //recuperando a lista de produtos
    const products = prod.products;
    
    // nao é preciso passar o path da view product pois o pug está configurado para buscar das views
    // passando a lista de produtos com o nome de prods
    res.render('product', { prods: products, title: 'Produtos' }); 
    
    // código para pagina estatica
    //  res.sendFile(path.join(__dirname,'../', 'views', 'product.html')); //path.join() concatena o caminho
});

module.exports = routes;