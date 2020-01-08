const mysql = require('mysql2');

//buscando do arquivo utils/configConnection o objeto que será passado para o createPool
// objeto com o seguinte formato:
/*  
    {
        host: '',
        database: '',
        user: '',
        password: ''
    }
*/
const objConnect = require('./configConnection');

//diferente do createConnection o createPool pode manipular conexões simultâneas
const pool = mysql.createPool(objConnect);

module.exports = pool.promise();