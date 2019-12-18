const express = require('express');
const app = express();

const path = require('path');

//adicionando body-parser para trabalhar com o req.body
const bodyParser = require('body-parser');
//importando handlebars
//const expressHbs = require('express-handlebars');

app.use(bodyParser.urlencoded({ extended: false }));  //{ extended: false } funcionou sem mais apresentou uma mensagem de body-parser deprecated
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
const routes = require('./routes/product');
const pageRoutes = require('./routes/page');

//ação que acontecerá em qualquer chamada
app.use('/', (req, res, next) => {
    let now = new Date;
    let horaatual = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let host = req.url;
    console.log(`Chamada para ${host} às ${horaatual}`);
    next();
});

app.use(routes);
app.use(pageRoutes);

//ação que ocorrerá apenas se nenhuma página for encontrada
app.use((req, res, next) => {
    res.status(404).render('notFound', { title: 'Page Not Found'});

    //chamada da pagina estática
    //res.status(404).sendFile(path.join(__dirname, 'views', 'notFound.html'));
});

app.listen(3000, () => {
    console.log('Escutando em localhost:3000');
});