import { getEvents, joinEvent, deleteEvent, updateEvent } from '../services/api'

import { EventCard } from './EventCard'

const user = JSON.parse(localStorage.getItem('user'))

export const EventsList = () => {
  return `
    <section class="events-section">
      <div class="events-header">
        <h2>
          Próximos eventos
        </h2>

        <select id="events-filter">
          <option value="recent">
            Más recientes
          </option>

          <option value="popular">
            Más populares
          </option>

          <option value="upcoming">
            Próximos primero
          </option>
        </select>
      </div>

      <div id="events-container"></div>

      <div class="past-events-section">
        <h2>
          Eventos pasados
        </h2>

        <div id="past-events-container"></div>
      </div>

      <div
        id="edit-modal"
        class="edit-modal hidden"
      >
        <div class="edit-modal-content">
          <h2>
            Editar evento
          </h2>

          <form id="edit-event-form">
            <input
              type="text"
              id="edit-title"
              required
            >

            <input
              type="date"
              id="edit-date"
              required
            >

            <input
              type="time"
              id="edit-time"
              required
            >

            <input
              type="text"
              id="edit-location"
              required
            >

            <textarea
              id="edit-description"
              required
            ></textarea>

            <div class="edit-modal-actions">
              <button
                type="button"
                id="close-edit-modal"
              >
                Cancelar
              </button>

              <button type="submit">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `
}

export const renderEvents = async () => {
  const container = document.querySelector('#events-container')

  const pastContainer = document.querySelector('#past-events-container')

  const filterSelect = document.querySelector('#events-filter')

  if (!container || !pastContainer || !filterSelect) {
    return
  }

  const events = await getEvents()

  if (!events.length) {
    container.innerHTML = `
      <p class="empty-events">
        Todavía no hay eventos publicados.
      </p>
    `

    return
  }

  const now = new Date()

  let upcomingEvents = events.filter((event) => {
    const eventDate = new Date(`${event.date.split('T')[0]}T${event.time}`)

    return eventDate >= now
  })

  const pastEvents = events.filter((event) => {
    const eventDate = new Date(`${event.date.split('T')[0]}T${event.time}`)

    return eventDate < now
  })

  const applyFilters = () => {
    const filter = filterSelect.value

    if (filter === 'popular') {
      upcomingEvents.sort((a, b) => b.attendees.length - a.attendees.length)
    }

    if (filter === 'recent') {
      upcomingEvents.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    }

    if (filter === 'upcoming') {
      upcomingEvents.sort(
        (a, b) =>
          new Date(`${a.date.split('T')[0]}T${a.time}`) -
          new Date(`${b.date.split('T')[0]}T${b.time}`)
      )
    }

    container.innerHTML = upcomingEvents
      .map((event) => EventCard(event))
      .join('')

    addEventCardListeners()
  }

  applyFilters()

  filterSelect.addEventListener('change', applyFilters)

  pastContainer.innerHTML = pastEvents.length
    ? pastEvents.map((event) => EventCard(event)).join('')
    : `
      <p class="empty-events">
        No hay eventos pasados.
      </p>
    `
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
