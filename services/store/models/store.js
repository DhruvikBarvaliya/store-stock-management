const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Store = sequelize.define('Store', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    manager: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Store;