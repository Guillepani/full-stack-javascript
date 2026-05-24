const Event = require('../models/Event')

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('attendees', '-password')

    return res.status(200).json(events)
  } catch (error) {
    return res.status(500).json('Error obteniendo eventos')
  }
}

const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body)

    const savedEvent = await newEvent.save()

    return res.status(201).json({
      message: 'Evento creado correctamente',
      event: savedEvent
    })
  } catch (error) {
    return res.status(500).json('Error creando evento')
  }
}

const joinEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $addToSet: {
          attendees: userId
        }
      },
      {
        new: true
      }
    ).populate('attendees', '-password')

    return res.status(200).json({
      message: 'Asistencia confirmada',
      event: updatedEvent
    })
  } catch (error) {
    return res.status(500).json('Error al unirse al evento')
  }
}

module.exports = {
  getEvents,
  createEvent,
  joinEvent
}
