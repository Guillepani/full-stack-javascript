import './styles/global.css'

import { RegisterForm, registerFormListeners } from './components/RegisterForm'

document.querySelector('#app').innerHTML = `
  <h1>MeetMoto</h1>

  ${RegisterForm()}
`

registerFormListeners()
