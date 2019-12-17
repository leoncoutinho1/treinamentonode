const express = require('express');
const app = express();

const path = require('path');

//adicionando body-parser para trabalhar com o req.body
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));  //{ extended: false } funcionou sem mais apresentou uma mensagem de body-parser deprecated
app.use(express.static(path.join(__dirname, 'public'))); //liberando acesso à pasta public

//configurando pug para utilização de templates
app.set('view engine', 'pug');
app.set('views', 'views');

//utilizando o router
const productData = require('./routes/product');
const pageRoutes = require('./routes/page');

//ação que acontecerá em qualquer chamada
app.use('/', (req, res, next) => {
    let now = new Date;
    let horaatual = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let host = req.url;
    console.log(`Chamada para ${host} às ${horaatual}`);
    next();
});

app.use(productData.routes);
app.use(pageRoutes);

//ação que ocorrerá apenas se nenhuma página for encontrada
app.use((req, res, next) => {
    res.status(404).render('notFound');

    //chamada da pagina estática
    //res.status(404).sendFile(path.join(__dirname, 'views', 'notFound.html'));
});

app.listen(3000, () => {
    console.log('Escutando em localhost:3000');
});