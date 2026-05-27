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
    origin: true,
    credentials: true,
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

app.listen(3000, () => {
  console.log('Servidor levantado en http://localhost:3000')
})
