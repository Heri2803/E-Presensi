const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Presensi API',
      version: '1.0.0',
      description: 'API documentation for ePresensi App'
    },
    servers: [
      {
        url: 'http://192.168.193.51:5000/api'
      }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./routes/*.js'] // Scan semua route untuk Swagger annotation
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
