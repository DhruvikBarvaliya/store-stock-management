
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

module.exports = sequelize;



// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
// });

