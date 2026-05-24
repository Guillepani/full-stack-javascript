const express = require('express')

const auth = require('../../middlewares/auth')

const {
  getEvents,
  createEvent,
  joinEvent
} = require('../controllers/eventController')

const eventRoutes = express.Router()

eventRoutes.get('/', getEvents)
eventRoutes.post('/', auth, createEvent)
eventRoutes.put('/join', joinEvent)

module.exports = eventRoutes
