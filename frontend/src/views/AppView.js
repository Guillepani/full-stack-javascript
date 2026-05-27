import { Navbar } from '../components/Navbar'

import { EventsList } from '../components/EventsList'

import {
  CreateEventForm,
  createEventListeners
} from '../components/CreateEventForm'

import { renderEvents } from '../components/EventsList'

import { logoutListener } from '../components/LogoutButton'

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

      <section
        id="main-content"
        class="app-layout"
      >
        <aside class="create-event-panel">
          ${CreateEventForm()}
        </aside>

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

  const token = localStorage.getItem('token')

  homeButton.addEventListener('click', () => {
    mainContent.innerHTML = `
      <aside class="create-event-panel">
        ${CreateEventForm()}
      </aside>

      <section class="events-panel">
        ${EventsList()}
      </section>
    `

    createEventListeners()

    renderEvents()
  })

  profileButton.addEventListener('click', async () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const events = await getEvents()

    mainContent.innerHTML = `
        ${ProfileView(user, events)}
      `
  })
}
