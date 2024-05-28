const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const GatePass = sequelize.define('GatePass', {
    material: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    issuedBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = GatePass;