import { getEvents } from '../../services/api'

import { addEventCardListeners } from '../../utils/eventListeners'

import { EditEventModal } from './EditEventModal'

import { EventCard } from '../events/EventCard'

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

      ${EditEventModal()}
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
