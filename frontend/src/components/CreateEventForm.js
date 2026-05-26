import { createEvent } from '../services/api'

import { renderEvents } from './EventsList'

export const CreateEventForm = () => {
  return `
    <section class="create-event-section">
      <h2>
        Crear evento
      </h2>

      <form id="event-form">
        <input
          type="text"
          name="title"
          placeholder="Título"
          required
        >

        <input
          type="date"
          name="date"
          required
        >

        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          required
        >

        <textarea
          name="description"
          placeholder="Descripción"
          required
        ></textarea>

        <button>
          Crear evento
        </button>
      </form>
    </section>
  `
}

export const createEventListeners = () => {
  const form = document.querySelector('#event-form')

  if (!form) return

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(form)

    const eventData = {
      title: formData.get('title'),
      date: formData.get('date'),
      location: formData.get('location'),
      description: formData.get('description')
    }

    const response = await createEvent(eventData)

    console.log(response)

    renderEvents()

    form.reset()
  })
}
