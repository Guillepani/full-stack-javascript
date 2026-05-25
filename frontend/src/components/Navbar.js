export const Navbar = (token) => {
  return `
    <header class="navbar">
      <h1>MeetMoto</h1>

      <nav>
        <a href="#">Eventos</a>

        ${
          token
            ? `
              <button id="logout-btn">
                Logout
              </button>
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
