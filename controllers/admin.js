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
};

exports.getProducts = (req, res, next) => {
    Product
        .fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getAddProduct = (req,res,next) => {
    res.render(
        'admin/edit-product',
        {
            pageTitle: 'Add Product', 
            path:'/admin/add-product',
            editing: false
        }
    );
};

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const productId = req.params.productId;
    Product
        .findById(productId)
        .then(product => {
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
                });
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
    const product = new Product(title, price, imageUrl, description, null, req.user._id);
    product
        .save()
        .then(result => {
            console.log('Create Product.');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })

}    
        

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    
    const product = new Product(updatedTitle, 
                                updatedPrice, 
                                updatedImageUrl, 
                                updatedDescription, 
                                prodId);

    product
        .save()
        .then(result => {
            console.log('Updated product.');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product
        .deleteById(prodId)
        .then(() => {
            console.log('Removed product');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

