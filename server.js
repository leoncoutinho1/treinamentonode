const express = require('express');
const mongoConnect = require('./utils/database').mongoConnect;

const app = express();

const path = require('path');

//adicionando body-parser para trabalhar com o req.body
const bodyParser = require('body-parser');

const User = require('./models/user');

//middleware que recupera o usuário logado
app.use((req,res,next) => {
    User
        .findById('5e279a0b3128dd0e1efbd3a3')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});

app.use(bodyParser.urlencoded({ extended: false }));  //{ extended: false } funcionou sem mas apresentou uma mensagem de body-parser deprecated
app.use(express.static(path.join(__dirname, 'public'))); //liberando acesso à pasta public

//importando rotas
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const notFoundRoutes = require('./routes/notFound'); 

app.use(adminRoutes);
app.use(shopRoutes);
app.use(notFoundRoutes); 

app.set('view engine', 'ejs');
app.set('views', 'views');

//chama a conexão com o mongoDB passando uma função de callback
mongoConnect(() => {
    app.listen(3000, () => {
        console.log('Escutando em localhost:3000');
    });
});