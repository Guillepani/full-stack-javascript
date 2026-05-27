require('dotenv').config()

const express = require('express')
const cors = require('cors')

const connectDB = require('./config/db')

const userRoutes = require('./api/routes/userRoutes')
const eventRoutes = require('./api/routes/eventRoutes')

connectDB()

const app = express()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend funcionando')
})

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/events', eventRoutes)

app.use((error, req, res, next) => {
  console.dir(error, { depth: null })

  return res.status(500).json({
    message: error.message || 'Error interno del servidor'
  })
})

app.listen(3000, () => {
  console.log('Servidor levantado en http://localhost:3000')
})
