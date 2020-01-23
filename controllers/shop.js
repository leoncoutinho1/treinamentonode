const mongodb = require('mongodb');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product
        .find()                     // provide by mongoose
        .then(products => res.render(
            'shop/product-list', 
            { 
                prods: products,
                pageTitle: 'All Products', 
                path: '/products' 
            })
        )
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product
        .findById(prodId)               //provide by mongoose, it converts id from string to objectId 
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            })
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product
        .find()                     // provide by mongoose
        .then(products => res.render(
                'shop/index', 
                { 
                    prods: products,
                    pageTitle: 'Shop', 
                    path: '/' 
                }
        ))
        .catch(err => console.log(err));
};


exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')   //populate temporarily the products in place of productId.
        .execPopulate()                     //populate works because productId in user model was set as ref: 'Product'
        .then(user => {
            const products = user.cart.items;   //populate list items inside productId, modifications was made in cart.ejs
            return products;
        })
        .then(products => {
            res.render('shop/cart', 
                { 
                    pageTitle: 'Your Cart', 
                    path: '/cart',
                    products: products
                });    
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            return res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product
        .findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            // console.log(result);
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', 
        { 
            pageTitle: 'Checkout', 
            path: '/checkout' 
        });
};

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders() 
        .then(orders => {
            res.render('shop/orders', 
                { 
                    pageTitle: 'Orders', 
                    path: '/orders',
                    orders: orders
                });
        })
        .catch(err => console.log(err));
    
};

exports.postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err));
};