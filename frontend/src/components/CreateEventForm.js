import { renderEvents } from './EventsList'

export const CreateEventForm = () => {
  return `
    <section>
      <h2>Crear evento</h2>

      <form id="event-form">
        <input type="text" name="title" placeholder="Título" required>

        <input type="date" name="date" required>

        <input type="text" name="location" placeholder="Ubicación" required>

        <textarea
          name="description"
          placeholder="Descripción"
          required
        ></textarea>

        <button>Crear evento</button>
      </form>
    </section>
  `
}

export const createEventListeners = () => {
  const form = document.querySelector('#event-form')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('token')

    const formData = new FormData(form)

    const eventData = {
      title: formData.get('title'),
      date: formData.get('date'),
      location: formData.get('location'),
      description: formData.get('description')
    }

    const response = await fetch(
      'https://automatic-space-guide-97j76rxvj4jwhprrr-3000.app.github.dev/api/v1/events',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      }
    )

    const data = await response.json()

    console.log(data)

    renderEvents()

    form.reset()
  })
}
