const products = [];

exports.getAddProduct = (req,res,next) => {
    //renderização com handlebars
    //res.render('add-product', { pageTitle: 'Add Product', activeAddProduct: true});
    //renderização com pug e ejs
    res.render(
        'add-product',
        {
            pageTitle: 'Add Product', 
            path:'/add-product'
        }
    );
    // código para pagina estatica
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
};

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title, price: req.body.price});   //recupera os dados digitados no form pelo body da request
    res.redirect('/'); 
};

exports.getProducts = (req, res, next) => {
    //recuperando a lista de produtos
    
    // nao é preciso passar o path da view product pois o pug está configurado para buscar das views
    // passando a lista de produtos com o nome de prods
    //renderização com handlebars
    //res.render('product', { prods: products, pageTitle: 'Produtos', hasProduct: (products.length > 0), activeShop: true }); 
    
    //renderização com pug e ejs
    res.render('product', { prods: products, pageTitle: 'Produtos', hasProduct: (products.length > 0), path: '/' }); 

    // código para pagina estatica
    //  res.sendFile(path.join(__dirname,'../', 'views', 'product.html')); //path.join() concatena o caminho
}; 