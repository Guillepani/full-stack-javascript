import { LoginForm } from '../components/auth/LoginForm'

import { loginFormListeners } from '../components/auth/LoginForm'

import { RegisterForm } from '../components/auth/RegisterForm'

import { registerFormListeners } from '../components/auth/RegisterForm'

export const AuthView = () => {
  return `
    <main class="auth-view">
      <section class="hero-section">
        <div class="hero-overlay"></div>

        <div class="hero-content">
          <span class="hero-badge">
            Comunidad motera
          </span>

          <h1>
            MeetMoto
          </h1>

          <p>
            Descubre rutas, conoce moteros y crea eventos increíbles.
          </p>
        </div>
      </section>

      <section class="auth-panel">
        <div id="auth-forms">
          ${renderLoginView()}
        </div>
      </section>
    </main>
  `
}

const renderLoginView = () => {
  return `
    <div class="auth-box">
      <div class="auth-header">
        <h2>
          Iniciar sesión
        </h2>

        <p>
          Accede a la comunidad motera.
        </p>
      </div>

      ${LoginForm()}

      <div class="auth-switch">
        <span>
          ¿Todavía no tienes cuenta?
        </span>

        <button id="go-register">
          Crear cuenta
        </button>
      </div>
    </div>
  `
}

const renderRegisterView = () => {
  return `
    <div class="auth-box">
      <div class="auth-header">
        <h2>
          Crear cuenta
        </h2>

        <p>
          Únete a MeetMoto y empieza a descubrir rutas.
        </p>
      </div>

      ${RegisterForm()}

      <div class="auth-switch">
        <span>
          ¿Ya tienes cuenta?
        </span>

        <button id="go-login">
          Volver al login
        </button>
      </div>
    </div>
  `
}

export const authViewListeners = () => {
  loginFormListeners()

  const authForms = document.querySelector('#auth-forms')

  document.addEventListener('click', (event) => {
    if (event.target.id === 'go-register') {
      authForms.innerHTML = renderRegisterView()

      registerFormListeners()
    }

    if (event.target.id === 'go-login') {
      authForms.innerHTML = renderLoginView()

      loginFormListeners()
    }
  })
}
