const express = require('express')

const {
  getEvents,
  createEvent,
  joinEvent
} = require('../controllers/eventController')

const eventRoutes = express.Router()

eventRoutes.get('/', getEvents)
eventRoutes.post('/', createEvent)
eventRoutes.put('/join', joinEvent)

module.exports = eventRoutes
