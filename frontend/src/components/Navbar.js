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
              <button
                id="home-view-btn"
                class="nav-btn"
              >
                Eventos
              </button>

              <button
                id="profile-view-btn"
                class="nav-btn"
              >
                Mi perfil
              </button>

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
