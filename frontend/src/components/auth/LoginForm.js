import { loginUser } from '../../services/api'

export const LoginForm = () => {
  return `
    <form id="login-form">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      >

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        required
      >

      <button>
        Login
      </button>
    </form>
  `
}

export const loginFormListeners = () => {
  const form = document.querySelector('#login-form')

  if (!form) return

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(form)

    const userData = {
      email: formData.get('email'),
      password: formData.get('password')
    }

    const response = await loginUser(userData)

    if (response.token) {
      localStorage.setItem('token', response.token)

      localStorage.setItem('user', JSON.stringify(response.user))

      window.location.reload()
    }

    console.log(response)
  })
}
