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
    req.user
        .getProducts({ where: {id: productId} })
        .then(products => {
            const product = products[0];
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
                })
            })
        .catch(err => {
            console.log(err);
            return res.redirect('/');
        });    
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    
    //método gerado pelo sequelize após associar o produto ao usuário
    req.user.createProduct({
        title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        })
        .then(result => {
            console.log('Product created.');
            res.redirect('/');
        })
        .catch(err => console.log(err));
};
        

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product
        .findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription;
            return product.save();
        })
        .then(
            result => {
                console.log('Updated product.');
                res.redirect('/admin/products');
            }
        ) //esse then é referente ao product.save que foi retornado
        .catch(
            err => console.log(err)); //esse catch vale tanto para o primeiro quanto pro segundo then
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product
        .findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('Destroyed product');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};