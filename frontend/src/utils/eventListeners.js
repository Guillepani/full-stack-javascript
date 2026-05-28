import { joinEvent, deleteEvent, updateEvent } from '../services/api'

import { renderEvents } from '../components/events/EventsList'

const user = JSON.parse(localStorage.getItem('user'))

export const addEventCardListeners = () => {
  const joinButtons = document.querySelectorAll('.join-btn')

  joinButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const eventId = button.dataset.eventId

      await joinEvent(eventId, user._id)

      renderEvents()
    })
  })

  const deleteButtons = document.querySelectorAll('.delete-btn')

  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const confirmed = confirm('¿Seguro que quieres eliminar este evento?')

      if (!confirmed) return

      const eventId = button.dataset.eventId

      await deleteEvent(eventId)

      renderEvents()
    })
  })

  const modal = document.querySelector('#edit-modal')

  const form = document.querySelector('#edit-event-form')

  const closeButton = document.querySelector('#close-edit-modal')

  const editButtons = document.querySelectorAll('.edit-btn')

  let currentEventId = null

  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentEventId = button.dataset.eventId

      document.querySelector('#edit-title').value = button.dataset.title

      document.querySelector('#edit-location').value = button.dataset.location

      document.querySelector('#edit-description').value =
        button.dataset.description

      document.querySelector('#edit-date').value = button.dataset.date

      document.querySelector('#edit-time').value = button.dataset.time

      modal.classList.remove('hidden')
    })
  })

  closeButton.addEventListener('click', () => {
    modal.classList.add('hidden')
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    await updateEvent(currentEventId, {
      title: document.querySelector('#edit-title').value,

      date: document.querySelector('#edit-date').value,

      time: document.querySelector('#edit-time').value,

      location: document.querySelector('#edit-location').value,

      description: document.querySelector('#edit-description').value
    })

    modal.classList.add('hidden')

    renderEvents()
  })
}
