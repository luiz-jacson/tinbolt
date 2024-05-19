const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const PORT = process.env.PORT || 3000; 
const conteudoRoutes = require('./routes/conteudoRoutes');
const instrucaoRoutes = require('./routes/instrucaoRoutes');
const genericoRoutes = require('./routes/genericoRoutes');
const YAML = require('yamljs');
const fs = require('fs');

const path = require('path');

// Caminho absoluto para o arquivo YAML
const yamlPath = path.resolve(__dirname, 'swagger.yaml');

// Carrega o arquivo YAML de forma assíncrona
fs.readFile(yamlPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao carregar o arquivo YAML:', err);
        return;
    }

    // Parseia o conteúdo do arquivo YAML
    const swaggerDocument = YAML.parse(data);

    // Configura o Express
    app.use(express.json());
    app.use('/inserirInstrucao', instrucaoRoutes);
    app.use('/gerarConteudoEspecifico', conteudoRoutes);
    app.use('/gerarConteudoGenerico', genericoRoutes);

    // Adiciona o Swagger UI somente se o arquivo YAML for carregado com sucesso
    if (swaggerDocument) {
        app.use('/api-TinBolt-GEMINI', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    // Inicia o servidor
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
