import './styles/global.css'
import './styles/navbar.css'
import './styles/forms.css'
import './styles/events.css'

import { Navbar } from './components/Navbar'
import { logoutListener } from './components/LogoutButton'

import {
  CreateEventForm,
  createEventListeners
} from './components/CreateEventForm'

import { RegisterForm, registerFormListeners } from './components/RegisterForm'

import { LoginForm, loginFormListeners } from './components/LoginForm'

import { EventsList, renderEvents } from './components/EventsList'

const token = localStorage.getItem('token')

document.querySelector('#app').innerHTML = `
  ${Navbar(token)}

  <main class="main-content">

  <div class="auth-container">
    <section>
      <h2>Registro</h2>
      ${RegisterForm()}
    </section>

    <section>
      <h2>Login</h2>
      ${LoginForm()}
    </section>
  </div>

  ${token ? CreateEventForm() : ''}

  ${EventsList()}
</main>
`

registerFormListeners()
loginFormListeners()
createEventListeners()
renderEvents()
logoutListener()
