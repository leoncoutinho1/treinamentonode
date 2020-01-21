const mongodb = require('mongodb');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    // @ts-ignore
    Product
        .fetchAll()
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
        .findById(prodId)
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
    //pode ser passado um objeto com opções como parametro de findAll
    //por exemplo a clausula where
    Product
        .fetchAll()
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
        .getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', 
                        { 
                            pageTitle: 'Your Cart', 
                            path: '/cart',
                            products: products
                        });    
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts( {where: {id: prodId} } );
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart
                .getProducts({ where: {id: prodId} });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product){
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product
                .findByPk(prodId);
        })
        .then(product => {
            return fetchedCart
                .addProduct(product, { 
                    through: { quantity: newQuantity } 
                });
        })
        .then(
            () => {res.redirect('/cart')}
        )
        .catch(err => console.log(err));
        

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
    req.user
        .getOrders( {include: ['products']} )         //envia junto com as orders os produtos relacionados de acordo com a nomenclatura que foi passada no model: orderItem
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
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {                     //recupera o cart do user
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {                 //recupera os produtos deste cart
            return req.user
                .createOrder()              //cria uma ordem para o usuário
                .then(order => {
                    return order.addProduct(                   //adiciona produtos na ordem de venda
                        products.map(product => {       //.map percorre o array e executa a função de callback
                            product.orderItem = { quantity: product.cartItem.quantity };            //passa a qty que está no cart para a order
                            return product;
                        })
                    );
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err));
};