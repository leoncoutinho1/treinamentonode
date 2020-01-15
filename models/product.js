//necessário importar a classe para ter acesso aos tipos de atributos para relacionar na classe.
const Sequelize = require('sequelize');

//importando a instância já configurada
const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Product;