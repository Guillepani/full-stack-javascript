import { registerUser } from '../services/api'

const validateRegister = ({ name, email, password }) => {
  const errors = []

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)

  if (!name || name.trim().length < 2) {
    errors.push('El nombre es obligatorio y debe tener al menos 2 caracteres.')
  }

  if (!emailRegex.test(email)) {
    errors.push('Introduce un email válido.')
  }

  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres.')
  }

  if (!hasUppercase) {
    errors.push('La contraseña debe incluir al menos una mayúscula.')
  }

  if (!hasNumber) {
    errors.push('La contraseña debe incluir al menos un número.')
  }

  return errors
}

export const RegisterForm = () => {
  return `
    <form id="register-form" novalidate>
      <input type="text" name="name" placeholder="Nombre" autocomplete="name">

      <input type="email" name="email" placeholder="Email" autocomplete="email">

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        autocomplete="new-password"
      >

      <div id="register-errors" class="form-errors"></div>

      <button>Registrarse</button>
    </form>
  `
}

export const registerFormListeners = () => {
  const form = document.querySelector('#register-form')

  if (!form) return

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const errorsContainer = document.querySelector('#register-errors')

    const formData = new FormData(form)

    const userData = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      password: formData.get('password')
    }

    const errors = validateRegister(userData)

    if (errors.length) {
      errorsContainer.innerHTML = errors
        .map((error) => `<p>${error}</p>`)
        .join('')

      return
    }

    const response = await registerUser(userData)

    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))

      window.location.reload()
      return
    }

    errorsContainer.innerHTML = `
      <p>${response.message || 'No se pudo registrar el usuario.'}</p>
    `
  })
}
