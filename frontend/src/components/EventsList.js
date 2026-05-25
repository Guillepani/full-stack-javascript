import { getEvents } from '../services/api'

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

  container.innerHTML = events
    .map(
      (event) => `
        <article>
          <h3>${event.title}</h3>

          <p>${event.location}</p>

          <p>${event.description}</p>
        </article>
      `
    )
    .join('')
}
