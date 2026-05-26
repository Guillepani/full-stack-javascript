import { Navbar } from '../components/Navbar'
import { EventsList } from '../components/EventsList'
import {
  CreateEventForm,
  createEventListeners
} from '../components/CreateEventForm'

import { renderEvents } from '../components/EventsList'
import { logoutListener } from '../components/LogoutButton'

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

      <section class="app-layout">
        <aside class="create-event-panel">
          ${CreateEventForm()}
        </aside>

        <section class="events-panel">
          ${EventsList()}
        </section>
      </section>
    </main>
  `
}

export const appViewListeners = () => {
  createEventListeners()
  renderEvents()
  logoutListener()
}
