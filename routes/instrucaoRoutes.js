const express = require('express');
const app = express();
const cache = require('memory-cache');
const controller = require("../controllers/instrucaoController")
const router = express.Router()
router.post('/', async (req, res) => {
    try {
       const instrucao = controller.post(req, res);
       cache.put('instrucao', instrucao.toString())
       return res.status(200).json({
            success: true,
            data: 'Instrução Salva com sucesso'
       })
    } catch (error) {
        return res.status(500).json({
            success:false ,
            error: error 
        });
    }
});


app.use(express.json())

module.exports = router

