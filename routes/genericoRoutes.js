require("dotenv").config({ path: '.env' });
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.key);
const app = express();
const router = express.Router()
const controller = require("../controllers/genericoController")

router.post('/', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
        });
        const prompt = controller.post(req, res);
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return res.status(200).json({
            success: true,
            data: text
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error
        });
    }
});


app.use(express.json())

module.exports = router

