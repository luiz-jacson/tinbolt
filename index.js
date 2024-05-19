const express = require('express');
const fs = require('fs');
const app = express();
const swaggerUi = require('swagger-ui-express')
const PORT = process.env.PORT || 3000; 
const conteudoRoutes = require('./routes/conteudoRoutes')
const instrucaoRoutes = require('./routes/instrucaoRoutes')
const genericoRoutes = require('./routes/genericoRoutes')

fs.readFile('./swagger.yaml', 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao carregar o arquivo YAML:', err);
        return;
    }

    const swaggerDocument = YAML.parse(data);

    app.use(express.json())

    app.use('/inserirInstrucao', instrucaoRoutes)
    app.use('/gerarConteudoEspecifico', conteudoRoutes)
    app.use('/gerarConteudoGenerico', genericoRoutes)

    app.use('/api-TinBolt-GEMINI', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
