const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const PurchaseOrder = sequelize.define('PurchaseOrder', {
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = PurchaseOrder;