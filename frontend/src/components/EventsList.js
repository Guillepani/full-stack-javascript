import { getEvents } from '../services/api'
import { EventCard } from './EventCard'

export const EventsList = () => {
  return `
    <section>
      <h2>Eventos</h2>

      <div id="events-container"></div>
    </section>
  `
}

export const renderEvents = async () => {
  const container = document.querySelector('#events-container')

  const events = await getEvents()

  container.innerHTML = events.map((event) => EventCard(event)).join('')
}
