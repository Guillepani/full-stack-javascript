const express = require('express')

const auth = require('../../middlewares/auth')

const {
  getEvents,
  createEvent,
  joinEvent,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController')

const eventRoutes = express.Router()

eventRoutes.get('/', getEvents)
eventRoutes.get('/:id', getEventById)
eventRoutes.post('/', auth, createEvent)
eventRoutes.put('/join', joinEvent)
eventRoutes.put('/:id', auth, updateEvent)
eventRoutes.delete('/:id', auth, deleteEvent)

module.exports = eventRoutes
