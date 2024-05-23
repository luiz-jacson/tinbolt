const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 
const conteudoRoutes = require('./routes/conteudoRoutes');
const instrucaoRoutes = require('./routes/instrucaoRoutes');
const genericoRoutes = require('./routes/genericoRoutes');

app.use(express.json());
app.use('/inserirInstrucao', instrucaoRoutes);
app.use('/gerarConteudoEspecifico', conteudoRoutes);
app.use('/gerarConteudoGenerico', genericoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
