const express = require('express');
const app = express();

const path = require('path');

//adicionando body-parser para trabalhar com o req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));  //{ extended: false } funcionou sem mais apresentou uma mensagem de body-parser deprecated
app.use(express.static(path.join(__dirname, 'public'))); //liberando acesso à pasta public

//utilizando o router
const productRoutes = require('./routes/product');
const pageRoutes = require('./routes/page');

//ação que acontecerá em qualquer chamada
app.use('/', (req, res, next) => {
    now = new Date;
    horaatual = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    host = req.url;
    console.log(`Chamada para ${host} às ${horaatual}`);
    next();
});

app.use(productRoutes);
app.use(pageRoutes);

//ação que ocorrerá apenas se nenhuma página for encontrada
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'notFound.html'));
});

app.listen(3000, () => {
    console.log('Escutando em localhost:3000');
});