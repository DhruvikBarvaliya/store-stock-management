const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Store Stock Management API',
      version: '1.0.0',
      description: 'API documentation for Store Stock Management',
    },
  },
  apis: ['./services/**/*.js'],
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
