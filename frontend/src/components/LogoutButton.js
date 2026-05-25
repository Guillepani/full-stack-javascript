export const LogoutButton = () => {
  return `
    <button id="logout-btn">
      Logout
    </button>
  `
}

export const logoutListener = () => {
  const button = document.querySelector('#logout-btn')

  if (!button) return

  button.addEventListener('click', () => {
    localStorage.removeItem('token')

    location.reload()
  })
}
