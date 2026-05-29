export const Navbar = (token) => {
  const user = JSON.parse(localStorage.getItem('user'))

  return `
    <header class="navbar">
      <div class="navbar-logo">
        MeetMoto
      </div>

      <nav class="navbar-right">
        ${
          token
            ? `
              <button
                id="profile-view-btn"
                class="nav-link"
              >
                Mi perfil
              </button>

              <div class="navbar-user">
                <div class="user-pill">
                  👤 ${user?.name || 'Usuario'}
                </div>

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
