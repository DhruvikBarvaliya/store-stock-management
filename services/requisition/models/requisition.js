const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Requisition = sequelize.define('Requisition', {
    requisitionNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    requester: {
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

module.exports = Requisition;