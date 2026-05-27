const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    image: {
      type: String,
      required: true
    },

    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },

    attendees: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'users'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Event = mongoose.model('events', eventSchema)

module.exports = Event
