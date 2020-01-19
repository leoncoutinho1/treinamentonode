const express = require('express');
const app = express();

const path = require('path');

//adicionando body-parser para trabalhar com o req.body
const bodyParser = require('body-parser');
//importando handlebars
//const expressHbs = require('express-handlebars');

const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));  //{ extended: false } funcionou sem mas apresentou uma mensagem de body-parser deprecated
app.use(express.static(path.join(__dirname, 'public'))); //liberando acesso à pasta public

//middleware que recupera o usuário logado
app.use((req,res,next) => {
    User
        .findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

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

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

//sincroniza o sequelize e se tiver sucesso inicia o server
sequelize
//    .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
        //console.log(result);
    })
    .then(user => {
        if (!user) {
            User.create({ name: "Max", email: "teste@teste.com"});
        }
        return user;
    })
    .then(user => {
        //console.log(user);
        app.listen(3000, () => {
            console.log('Escutando em localhost:3000');
        });
    })
    .catch(err => console.log(err));
