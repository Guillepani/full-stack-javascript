const Event = require('../models/Event')

const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('attendees', '-password')
      .populate('creator', 'name email')

    return res.status(200).json(events)
  } catch (error) {
    return res.status(500).json({
      message: 'Error obteniendo eventos'
    })
  }
}

const createEvent = async (req, res) => {
  try {
    const { title, date, time, location, description } = req.body

    if (!title || !date || !time || !location || !description) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      })
    }

    const eventDate = new Date(`${date}T${time}`)

    if (eventDate <= new Date()) {
      return res.status(400).json({
        message: 'El evento debe ser futuro'
      })
    }

    const newEvent = new Event({
      title,
      date,
      time,
      location,
      description,
      creator: req.user.id
    })

    const savedEvent = await newEvent.save()

    return res.status(201).json({
      message: 'Evento creado correctamente',
      event: savedEvent
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error creando evento'
    })
  }
}

const joinEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body

    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({
        message: 'Evento no encontrado'
      })
    }

    const alreadyJoined = event.attendees.includes(userId)

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        [alreadyJoined ? '$pull' : '$addToSet']: {
          attendees: userId
        }
      },
      {
        new: true
      }
    )
      .populate('attendees', '-password')
      .populate('creator', 'name email')

    return res.status(200).json({
      message: alreadyJoined
        ? 'Has salido del evento'
        : 'Asistencia confirmada',
      event: updatedEvent
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error al unirse al evento'
    })
  }
}

const getEventById = async (req, res) => {
  try {
    const { id } = req.params

    const event = await Event.findById(id)
      .populate('attendees', '-password')
      .populate('creator', 'name email')

    if (!event) {
      return res.status(404).json({
        message: 'Evento no encontrado'
      })
    }

    return res.status(200).json(event)
  } catch (error) {
    return res.status(500).json({
      message: 'Error obteniendo evento'
    })
  }
}

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params

    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({
        message: 'Evento no encontrado'
      })
    }

    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'No puedes editar este evento'
      })
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true
    })

    return res.status(200).json({
      message: 'Evento actualizado correctamente',
      event: updatedEvent
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error actualizando evento'
    })
  }
}

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params

    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({
        message: 'Evento no encontrado'
      })
    }

    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'No puedes eliminar este evento'
      })
    }

    await Event.findByIdAndDelete(id)

    return res.status(200).json({
      message: 'Evento eliminado correctamente'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error eliminando evento'
    })
  }
}

module.exports = {
  getEvents,
  createEvent,
  joinEvent,
  getEventById,
  updateEvent,
  deleteEvent
}
