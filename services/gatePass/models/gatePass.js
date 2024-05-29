const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const GatePass = sequelize.define('GatePass', {
    passNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vehicleNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    driverName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = GatePass;