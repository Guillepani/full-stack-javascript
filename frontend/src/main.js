import './styles/global.css'

import { RegisterForm, registerFormListeners } from './components/RegisterForm'

import { LoginForm, loginFormListeners } from './components/LoginForm'

document.querySelector('#app').innerHTML = `
  <h1>MeetMoto</h1>

  <section>
    <h2>Registro</h2>
    ${RegisterForm()}
  </section>

  <section>
    <h2>Login</h2>
    ${LoginForm()}
  </section>
`

registerFormListeners()
loginFormListeners()
