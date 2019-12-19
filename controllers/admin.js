//ação que acontecerá em qualquer chamada
exports.logHour = (req, res, next) => {
    let now = new Date;
    let horaatual = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let host = req.url;
    console.log(`Chamada para ${host} às ${horaatual}`);
    next();
};

exports.notFound = (req, res, next) => {
    res.status(404).render('notFound', { pageTitle: 'Page Not Found'});

    //chamada da pagina estática
    //res.status(404).sendFile(path.join(__dirname, 'views', 'notFound.html'));
};