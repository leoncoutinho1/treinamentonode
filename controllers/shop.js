const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    //recuperando a lista de produtos
    
    // nao é preciso passar o path da view product pois o pug está configurado para buscar das views
    // passando a lista de produtos com o nome de prods
    //renderização com handlebars
    //res.render('product', { prods: products, pageTitle: 'Produtos', hasProduct: (products.length > 0), activeShop: true }); 

    //da forma descrita abaixo o código fica sincrono e a pagina é renderizada antes da leitura do arquivo

    /*      //criando um novo array que receberá os produtos
            //chama o metodo static que recupera todos os produtos
            const products = Product.fetchAll();
            
            //renderização com pug e ejs
            res.render('product', { prods: products, pageTitle: 'Produtos', path: '/' });  */

    //segue a forma assincrona
    //chamo o fetchAll que tem como parametro uma função de callback que vai renderizar a pagina
    //no model o fetchAll vai ler um arquivo e após a leitura chamará
    // a função de callback passando como parametro um array vazio ou
    // o array preenchido com os produtos que foram lidos do arquivo
    Product.fetchAll(products => {
        res.render('shop/product-list', 
                    { 
                        prods: products,
                        pageTitle: 'All Products', 
                        path: '/products' 
                    });
        });

    // código para pagina estatica
    //  res.sendFile(path.join(__dirname,'../', 'views', 'product.html')); //path.join() concatena o caminho
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', 
                    { 
                        prods: products,
                        pageTitle: 'Shop', 
                        path: '/' 
                    });
    });
};


exports.getCart = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/cart', 
                    { 
                        pageTitle: 'Your Cart', 
                        path: '/cart' 
                    });
    });
};

exports.getCheckout = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/checkout', 
                    { 
                        pageTitle: 'Checkout', 
                        path: '/checkout' 
                    });
    });
};