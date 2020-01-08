const express = require('express');
const app = express();

const path = require('path');

//adicionando body-parser para trabalhar com o req.body
const bodyParser = require('body-parser');
//importando handlebars
//const expressHbs = require('express-handlebars');

const db = require('./utils/database');

app.use(bodyParser.urlencoded({ extended: false }));  //{ extended: false } funcionou sem mas apresentou uma mensagem de body-parser deprecated
app.use(express.static(path.join(__dirname, 'public'))); //liberando acesso à pasta public

//habilitando para ejs
app.set('view engine', 'ejs');

//habilitando para handlebars
/* app.engine(
    'hbs', 
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
*/

//configurando pug para utilização de templates
//app.set('view engine', 'pug');   //comentado enquanto uso handlebars
app.set('views', 'views');

//utilizando o router
const productRoutes = require('./routes/shop');
const pageRoutes = require('./routes/admin');
const notFoundRoutes = require('./routes/notFound');

app.use(pageRoutes);
app.use(productRoutes);
app.use(notFoundRoutes);


app.listen(3000, () => {
    console.log('Escutando em localhost:3000');
});