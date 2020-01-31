const express = require('express');
const mongoose = require('mongoose');
const urlMongoDb = require('./utils/configConnection');
const csrf = require('csurf');
const csrfProtection = csrf();
const flash = require('connect-flash');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();

const store = new MongoDBStore({
    uri: urlMongoDb,
    collection: 'sessions'
});

const path = require('path');

//adicionando body-parser para trabalhar com o req.body
const bodyParser = require('body-parser');

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));  //{ extended: false } funcionou sem mas apresentou uma mensagem de body-parser deprecated
app.use(express.static(path.join(__dirname, 'public'))); //liberando acesso à pasta public

app.use(
    session({
        secret: 'aljsoeuc21casice5548epqs51spq65',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(csrfProtection);
app.use(flash());


//importando rotas
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const notFoundRoutes = require('./routes/notFound'); 

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(notFoundRoutes);

app.set('view engine', 'ejs');
app.set('views', 'views');

mongoose
  .connect(urlMongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000, () => {
        console.log('Escutando em localhost:3000');
    });
  })
  .catch(err => {
    console.log(err);
  });
