const express = require('express');
// const mongoConnect = require('./utils/database').mongoConnect;
const mongoose = require('mongoose');
const urlMongoDb = require('./utils/configConnection');
const app = express();

const path = require('path');

//adicionando body-parser para trabalhar com o req.body
const bodyParser = require('body-parser');

const User = require('./models/user');

//middleware que recupera o usuário logado
app.use((req,res,next) => {
    User
        .findById('5e29db4e0e045c2d2255d34a')
        .then(user => {
            req.user = user
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

//chama a conexão com o mongoose passando a string de conexão
mongoose.connect(urlMongoDb)
    .then(result => {
        User
            .findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Leo',
                        email: 'node@teste.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            });
        app.listen(3000, () => {
            console.log('Escutando em localhost:3000');
        });
    })
    .catch(err => {
        console.log(err);
    });