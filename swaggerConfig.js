const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nome da sua API',
      version: '1.0.0',
      description: 'Descrição da sua API',
    },
  },
  apis: ['./index.js'], // Especifique o caminho dos seus arquivos de rota
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};