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
        'admin/edit-product',
        {
            pageTitle: 'Add Product', 
            path:'/admin/add-product',
            editing: false
        }
    );
    // código para pagina estatica
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
};

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId;
    Product.findById(productId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render(
            'admin/edit-product',
            {
                pageTitle: 'Edit Product', 
                path:'/admin/edit-product',
                editing: editMode,
                product: product
            }
        );
    });
    
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const product = new Product(null, title, price, imageUrl, description);   //recupera os dados digitados no form pelo body da request
    product.save();
    res.redirect('/'); 
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedPrice, updatedImageUrl, updatedDescription);   //recupera os dados digitados no form pelo body da request
    updatedProduct.save();
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