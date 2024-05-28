const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Document = sequelize.define('Document', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Document;