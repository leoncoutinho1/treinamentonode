const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

//recupera a string de conexão do mongodb
const stringConn = require('./configConnection');

const mongoConnect = (callback) => {
    MongoClient
        .connect(stringConn)
        .then(client => {
            console.log('Connected to mongodb atlas');
            _db = client.db();  //pode ser passado como parâmetro o banco que será utilizado, como está ele vai utilizar o banco que consta na string de conexão
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;