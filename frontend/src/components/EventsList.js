import { getEvents, joinEvent, deleteEvent } from '../services/api'

import { EventCard } from './EventCard'

const user = JSON.parse(localStorage.getItem('user'))

export const EventsList = () => {
  return `
    <section class="events-section">
      <h2>
        Eventos
      </h2>

      <div id="events-container"></div>
    </section>
  `
}

export const renderEvents = async () => {
  const container = document.querySelector('#events-container')

  if (!container) return

  const events = await getEvents()

  if (!events.length) {
    container.innerHTML = `
      <p class="empty-events">
        Todavía no hay eventos publicados.
      </p>
    `

    return
  }

  container.innerHTML = events.map((event) => EventCard(event)).join('')

  addEventCardListeners()
}

const addEventCardListeners = () => {
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
}
