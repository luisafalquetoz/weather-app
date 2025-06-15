require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
app.use(cors())

const PORT = 3000
const API_KEY = process.env.OPENWEATHER_API_KEY

app.get('/weather', async (req, res) => {
    const city = req.query.city
    if (!city) return res.status(400).json({ error: 'Cidade não informada.' })

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados da API.' })
    }
})

app.get('/geo', async (req, res) => {
    const query = req.query.q
    if (!query) return res.status(400).json({ error: 'Consulta não informada.' })

    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`)
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados de geolocalização.' })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
