const Datatypes = require('sequelize');

const sequelize = require('../utils/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    quantity: Datatypes.INTEGER
});

module.exports = CartItem;