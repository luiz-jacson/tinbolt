const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express')
const PORT = process.env.PORT || 3000; 
const conteudoRoutes = require('./routes/conteudoRoutes')
const instrucaoRoutes = require('./routes/instrucaoRoutes')
const genericoRoutes = require('./routes/genericoRoutes')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('swagger.yaml');
app.use(express.json())

app.use('/inserirInstrucao', instrucaoRoutes)
app.use('/gerarConteudoEspecifico', conteudoRoutes)
app.use('/gerarConteudoGenerico', genericoRoutes)

app.use('/api-TinBolt-GEMINI', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
