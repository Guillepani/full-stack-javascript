const API_URL =
  'https://super-engine-pjpj746vpw642r4qr-3000.app.github.dev/api/v1'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  return response.json()
}

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  return response.json()
}

export const getEvents = async () => {
  const response = await fetch(`${API_URL}/events`)

  return response.json()
}

export const joinEvent = async (eventId, userId) => {
  const response = await fetch(`${API_URL}/events/join`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      eventId,
      userId
    })
  })

  return response.json()
}

export const deleteEvent = async (eventId) => {
  const response = await fetch(`${API_URL}/events/${eventId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  return response.json()
}

export const updateEvent = async (eventId, eventData) => {
  const response = await fetch(`${API_URL}/events/${eventId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(eventData)
  })

  return response.json()
}

export const createEvent = async (eventData) => {
  const response = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(eventData)
  })

  return response.json()
}
