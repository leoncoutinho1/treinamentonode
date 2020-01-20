const Datatypes = require('sequelize');

const sequelize = require('../utils/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    }

});

module.exports = Cart;