const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const PORT = process.env.PORT || 3000; 
const conteudoRoutes = require('./routes/conteudoRoutes');
const instrucaoRoutes = require('./routes/instrucaoRoutes');
const genericoRoutes = require('./routes/genericoRoutes');
const YAML = require('yamljs');

const yamlPath = './swagger.yaml';

fs.readFile(yamlPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao carregar o arquivo YAML:', err);
        return;
    }

    const swaggerDocument = YAML.parse(data);

    app.use(express.json());
    app.use('/inserirInstrucao', instrucaoRoutes);
    app.use('/gerarConteudoEspecifico', conteudoRoutes);
    app.use('/gerarConteudoGenerico', genericoRoutes);

    if (swaggerDocument) {
        app.use('/api-TinBolt-GEMINI', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
