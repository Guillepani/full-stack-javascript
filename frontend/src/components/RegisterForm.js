import { registerUser } from '../services/api'

export const RegisterForm = () => {
  return `
    <form id="register-form">
      <input type="text" name="name" placeholder="Nombre" required>
      
      <input type="email" name="email" placeholder="Email" required>

      <input type="password" name="password" placeholder="Contraseña" required>

      <button>Registrarse</button>
    </form>
  `
}

export const registerFormListeners = () => {
  const form = document.querySelector('#register-form')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(form)

    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    const response = await registerUser(userData)

    console.log(response)
  })
}
