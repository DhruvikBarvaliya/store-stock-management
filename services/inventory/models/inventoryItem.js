const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const InventoryItem = sequelize.define('InventoryItem', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = InventoryItem;