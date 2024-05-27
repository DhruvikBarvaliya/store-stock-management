const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const winston = require('winston');
require('dotenv').config();
const authRoutes = require('./services/auth/routes/authRoutes');
const inventoryRoutes = require('./services/inventory/routes/inventoryRoutes');
const requisitionRoutes = require('./services/requisitions/routes/requisitionRoutes');
const purchaseOrderRoutes = require('./services/purchaseOrders/routes/purchaseOrderRoutes');
const gatePassRoutes = require('./services/gatePass/routes/gatePassRoutes');
const documentRoutes = require('./services/documents/routes/documentRoutes');
const storeRoutes = require('./services/store/routes/storeRoutes');


// Initialize the app
const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'store-stock-management' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: msg => logger.info(msg),
});
// Test database connection
sequelize.authenticate()
    .then(() => logger.info('Database connected...'))
    .catch(err => logger.error('Error: ' + err));
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Store Stock Management API',
            version: '1.0.0',
            description: 'API documentation for Store Stock Management',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Local server'
            }
        ],
    },
    apis: ['./services/**/routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/requisitions', requisitionRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/gate-pass', gatePassRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/stores', storeRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
module.exports = app;