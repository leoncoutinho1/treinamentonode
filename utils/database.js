
//declarado com letra maiuscula e chaves pq o sequelize importa um constructor
const { Sequelize } = require('sequelize');

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

const sequelize = new Sequelize(objConnect.database, objConnect.user, objConnect.password, {
    dialect: 'mysql',
    host: objConnect.host
});

module.exports = sequelize;