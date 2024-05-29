const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Inventory = sequelize.define('Inventory', {
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Inventory;