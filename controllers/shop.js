const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    // @ts-ignore
    Product
        .findAll()
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
    // @ts-ignore
    Product
        .findByPk(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: 'shop/products'
            })
        })
        .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    //pode ser passado um objeto com opções como parametro de findAll
    //por exemplo a clausula where
    Product
        .findAll()
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
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', 
                    { 
                        pageTitle: 'Your Cart', 
                        path: '/cart',
                        products: cartProducts
                    });
        });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId,product.price);
        res.redirect('/cart');
    });
    

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');

}

exports.getCheckout = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/checkout', 
                    { 
                        pageTitle: 'Checkout', 
                        path: '/checkout' 
                    });
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', 
                { 
                    pageTitle: 'Orders', 
                    path: '/orders' 
                });
};