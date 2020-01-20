const Datatypes = require('sequelize');

const sequelize = require('../utils/database');

const Order = sequelize.define('order', {
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    }

});

module.exports = Order;