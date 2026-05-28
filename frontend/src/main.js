import './styles/global.css'
import './styles/navbar.css'
import './styles/forms.css'
import './styles/events.css'
import './styles/auth-view.css'
import './styles/app-view.css'
import './styles/event-detail.css'

import { AuthView, authViewListeners } from './views/AuthView'
import { AppView, appViewListeners } from './views/AppView'

const token = localStorage.getItem('token')

document.querySelector('#app').innerHTML = `
  ${!token ? AuthView() : AppView(token)}
`

if (!token) {
  authViewListeners()
} else {
  appViewListeners()
}
