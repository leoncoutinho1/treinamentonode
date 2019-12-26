const Product = require('../models/product');

//ação que acontecerá em qualquer chamada
exports.logHour = (req, res, next) => {
    let now = new Date;
    let horaatual = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let host = req.url;
    console.log(`Chamada para ${host} às ${horaatual}`);
    next();
};

exports.notFound = (req, res, next) => {
    res.status(404).render('admin/notFound', { pageTitle: 'Page Not Found', path: ''});

    //chamada da pagina estática
    //res.status(404).sendFile(path.join(__dirname, 'views', 'notFound.html'));
};

exports.getAddProduct = (req,res,next) => {
    //renderização com handlebars
    //res.render('add-product', { pageTitle: 'Add Product', activeAddProduct: true});
    //renderização com pug e ejs
    res.render(
        'admin/add-product',
        {
            pageTitle: 'Add Product', 
            path:'/admin/add-product'
        }
    );
    // código para pagina estatica
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const product = new Product(title, price, imageUrl, description);   //recupera os dados digitados no form pelo body da request
    product.save();
    res.redirect('/'); 
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};