import { Navbar } from '../components/layout/Navbar'

import { EventsList, renderEvents } from '../components/events/EventsList'

import {
  CreateEventForm,
  createEventListeners
} from '../components/forms/CreateEventForm'

import { logoutListener } from '../components/layout/LogoutButton'

import { getEvents } from '../services/api'

import { ProfileView } from './ProfileView'

export const AppView = (token) => {
  return `
    ${Navbar(token)}

    <main class="app-view">
      <section class="app-hero">
        <div>
          <span class="hero-badge">
            MeetMoto Experience
          </span>

          <h1>
            Descubre rutas increíbles
          </h1>

          <p>
            Únete a eventos moteros, conecta con riders y crea tus propias rutas.
          </p>
        </div>
      </section>

      <button
        id="open-create-modal"
        class="floating-create-btn"
      >
        Crear evento
      </button>

      <div
        id="create-event-modal"
        class="create-event-modal hidden"
      >
        <div class="create-event-modal-content">
          <div class="create-event-modal-top">
            <h2>
              Crear evento
            </h2>

            <button id="close-create-modal">
              ✕
            </button>
          </div>

          ${CreateEventForm()}
        </div>
      </div>

      <section
        id="main-content"
        class="app-layout"
      >
        <section class="events-panel">
          <div
            id="events-loader"
            class="events-loader"
          >
            Cargando eventos...
          </div>

          ${EventsList()}
        </section>
      </section>
    </main>
  `
}

export const appViewListeners = async () => {
  createEventListeners()

  await renderEvents()

  const loader = document.querySelector('#events-loader')

  if (loader) {
    loader.remove()
  }

  logoutListener()

  const homeButton = document.querySelector('#home-view-btn')

  const profileButton = document.querySelector('#profile-view-btn')

  const mainContent = document.querySelector('#main-content')

  const openCreateModal = document.querySelector('#open-create-modal')

  const closeCreateModal = document.querySelector('#close-create-modal')

  const createEventModal = document.querySelector('#create-event-modal')

  openCreateModal?.addEventListener('click', () => {
    createEventModal.classList.remove('hidden')
  })

  closeCreateModal?.addEventListener('click', () => {
    createEventModal.classList.add('hidden')
  })

  homeButton?.addEventListener('click', async () => {
    mainContent.innerHTML = `
        <section class="events-panel">
          ${EventsList()}
        </section>
      `

    await renderEvents()
  })

  profileButton?.addEventListener('click', async () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const events = await getEvents()

    mainContent.innerHTML = `
        ${ProfileView(user, events)}
      `
  })
}
