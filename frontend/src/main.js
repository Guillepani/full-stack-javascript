import './styles/global.css'

import {
  CreateEventForm,
  createEventListeners
} from './components/CreateEventForm'

import { RegisterForm, registerFormListeners } from './components/RegisterForm'

import { LoginForm, loginFormListeners } from './components/LoginForm'

import { EventsList, renderEvents } from './components/EventsList'

import { LogoutButton, logoutListener } from './components/LogoutButton'

const token = localStorage.getItem('token')

document.querySelector('#app').innerHTML = `
  <h1>MeetMoto</h1>

${token ? LogoutButton() : ''}

  <section>
    <h2>Registro</h2>
    ${RegisterForm()}
  </section>

  <section>
    <h2>Login</h2>
    ${LoginForm()}
  </section>

  ${token ? CreateEventForm() : ''}

  ${EventsList()}
`

registerFormListeners()
loginFormListeners()
createEventListeners()
renderEvents()
logoutListener()
