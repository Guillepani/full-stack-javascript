require('dotenv').config()

const connectDB = require('./config/db')
const userRoutes = require('./api/routes/userRoutes')
const express = require('express')
connectDB()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Backend funcionando')
})

app.use('/api/v1/users', userRoutes)

app.listen(3000, () => {
  console.log('Servidor levantado en http://localhost:3000')
})
