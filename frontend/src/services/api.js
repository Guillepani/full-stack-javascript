const API_URL =
  'https://automatic-space-guide-97j76rxvj4jwhprrr-3000.app.github.dev/api/v1'

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
