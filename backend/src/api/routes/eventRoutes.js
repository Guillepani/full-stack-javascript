const express = require('express')

const auth = require('../../middlewares/auth')

const upload = require('../../middlewares/fileUpload')

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

eventRoutes.post('/', auth, upload.single('image'), createEvent)

eventRoutes.put('/join', auth, joinEvent)

eventRoutes.put('/:id', auth, updateEvent)

eventRoutes.delete('/:id', auth, deleteEvent)

module.exports = eventRoutes
