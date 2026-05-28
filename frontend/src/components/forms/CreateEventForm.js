import { createEvent } from '../../services/api'

import { renderEvents } from '../events/EventsList'

import { showToast } from '../ui/Toast'

export const CreateEventForm = () => {
  const today = new Date().toISOString().split('T')[0]

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
          min="${today}"
          required
        >

        <input
          type="time"
          name="time"
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

        <input
          type="file"
          name="image"
          accept="image/*"
          required
        >

        <div
          id="event-form-error"
          class="form-errors"
        ></div>

        <button id="create-event-btn">
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

    const errorContainer = document.querySelector('#event-form-error')

    const submitButton = document.querySelector('#create-event-btn')

    errorContainer.innerHTML = ''

    const formData = new FormData(form)

    const selectedDate = formData.get('date')

    const selectedTime = formData.get('time')

    const eventDate = new Date(`${selectedDate}T${selectedTime}`)

    const now = new Date()

    if (eventDate <= now) {
      errorContainer.innerHTML = `
          <p>
            El evento debe ser en una fecha futura.
          </p>
        `

      return
    }

    try {
      submitButton.disabled = true

      submitButton.textContent = 'Creando evento...'

      const response = await createEvent(formData)

      showToast(response.message)

      await renderEvents()

      form.reset()
    } catch (error) {
      showToast('Error creando evento', 'error')
    } finally {
      submitButton.disabled = false

      submitButton.textContent = 'Crear evento'
    }
  })
}
