const Datatypes = require('sequelize');

const sequelize = require('../utils/database');

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    quantity: Datatypes.INTEGER
});

module.exports = OrderItem;