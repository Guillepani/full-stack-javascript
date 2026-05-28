import {
  joinEvent,
  deleteEvent,
  updateEvent,
  getEventById
} from '../services/api'

import { renderEvents } from '../components/events/EventsList'

import { EventDetailView } from '../views/EventDetailView'

import { EventsList } from '../components/events/EventsList'

import {
  CreateEventForm,
  createEventListeners
} from '../components/forms/CreateEventForm'

import { showToast } from '../components/ui/Toast'

const user = JSON.parse(localStorage.getItem('user'))

export const addEventCardListeners = () => {
  const joinButtons = document.querySelectorAll('.join-btn')

  joinButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        const eventId = button.dataset.eventId

        const response = await joinEvent(eventId, user._id)

        showToast(response.message)

        await renderEvents()
      } catch (error) {
        showToast('Error al actualizar asistencia', 'error')
      }
    })
  })

  const deleteModal = document.querySelector('#delete-modal')

  const confirmDeleteButton = document.querySelector('#confirm-delete-btn')

  const cancelDeleteButton = document.querySelector('#cancel-delete-btn')

  let eventToDelete = null

  const deleteButtons = document.querySelectorAll('.delete-btn')

  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      eventToDelete = button.dataset.eventId

      deleteModal.classList.remove('hidden')
    })
  })

  cancelDeleteButton?.addEventListener('click', () => {
    deleteModal.classList.add('hidden')

    eventToDelete = null
  })

  confirmDeleteButton?.addEventListener('click', async () => {
    try {
      if (!eventToDelete) return

      await deleteEvent(eventToDelete)

      showToast('Evento eliminado correctamente')

      deleteModal.classList.add('hidden')

      eventToDelete = null

      await renderEvents()
    } catch (error) {
      showToast('Error eliminando evento', 'error')
    }
  })

  const detailsButtons = document.querySelectorAll('.details-btn')

  detailsButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        const eventId = button.dataset.eventId

        const event = await getEventById(eventId)

        const mainContent = document.querySelector('#main-content')

        mainContent.innerHTML = EventDetailView(event)

        activateImagePreview()

        const backButton = document.querySelector('#back-to-events')

        backButton?.addEventListener('click', async () => {
          mainContent.innerHTML = `
                <section class="events-panel">
                  ${EventsList()}
                </section>
              `

          await renderEvents()
        })
      } catch (error) {
        showToast('Error cargando el evento', 'error')
      }
    })
  })

  activateImagePreview()

  const modal = document.querySelector('#edit-modal')

  const form = document.querySelector('#edit-event-form')

  const closeButton = document.querySelector('#close-edit-modal')

  const editButtons = document.querySelectorAll('.edit-btn')

  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      form.dataset.eventId = button.dataset.eventId

      document.querySelector('#edit-title').value = button.dataset.title

      document.querySelector('#edit-location').value = button.dataset.location

      document.querySelector('#edit-description').value =
        button.dataset.description

      document.querySelector('#edit-date').value = button.dataset.date

      document.querySelector('#edit-time').value = button.dataset.time

      modal.classList.remove('hidden')
    })
  })

  closeButton?.addEventListener('click', () => {
    modal.classList.add('hidden')
  })

  form?.addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
      await updateEvent(form.dataset.eventId, {
        title: document.querySelector('#edit-title').value,

        date: document.querySelector('#edit-date').value,

        time: document.querySelector('#edit-time').value,

        location: document.querySelector('#edit-location').value,

        description: document.querySelector('#edit-description').value
      })

      showToast('Evento actualizado correctamente')

      modal.classList.add('hidden')

      await renderEvents()
    } catch (error) {
      showToast('Error actualizando evento', 'error')
    }
  })
}

const activateImagePreview = () => {
  const previewModal = document.querySelector('#image-preview-modal')

  const previewImage = document.querySelector('#image-preview')

  const closePreviewButton = document.querySelector('#close-image-preview')

  const previewImages = document.querySelectorAll(
    '.event-image, .event-detail-image'
  )

  previewImages.forEach((image) => {
    image.addEventListener('click', () => {
      previewImage.src = image.src

      previewModal.classList.remove('hidden')
    })
  })

  closePreviewButton?.addEventListener('click', () => {
    previewModal.classList.add('hidden')

    previewImage.src = ''
  })

  previewModal?.addEventListener('click', (event) => {
    if (event.target === previewModal) {
      previewModal.classList.add('hidden')

      previewImage.src = ''
    }
  })
}
