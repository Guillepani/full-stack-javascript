export const Navbar = (token) => {
  const user = JSON.parse(localStorage.getItem('user'))

  return `
    <header class="navbar">
      <h1>
        MeetMoto
      </h1>

      <nav class="navbar-right">
        ${
          token
            ? `
              <div class="navbar-user">
                <span>
                  @${user?.name || 'Usuario'}
                </span>

                <button id="logout-btn">
                  Logout
                </button>
              </div>
            `
            : `
              <span class="auth-text">
                No autenticado
              </span>
            `
        }
      </nav>
    </header>
  `
}
