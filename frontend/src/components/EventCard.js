const user = JSON.parse(localStorage.getItem('user'))

export const EventCard = (event) => {
  const isCreator = user?._id === event.creator._id

  const isAttending = event.attendees.some(
    (attendee) => attendee._id === user?._id
  )

  return `
    <article class="event-card">
      <img
        class="event-image"
        src="${event.image}"
        alt="${event.title}"
      >

      <div class="event-card-top">
        <div>
          <h3>
            ${event.title}
          </h3>

          <span class="event-location">
            📍 ${event.location}
          </span>
        </div>

        ${
          isCreator
            ? `
              <span class="creator-badge">
                Tu evento
              </span>
            `
            : ''
        }
      </div>

      <div class="event-author">
        Creado por @${event.creator?.name || 'Usuario'}
      </div>

      <p class="event-description">
        ${event.description}
      </p>

      <div class="event-meta">
        <small>
          📅 ${new Date(event.date).toLocaleDateString()}
        </small>

        <small>
          🕒 ${event.time}
        </small>

        <small>
          👥 ${event.attendees.length} asistentes
        </small>
      </div>

      <div class="event-actions">
        <button
          class="join-btn"
          data-event-id="${event._id}"
        >
          ${isAttending ? 'Salir del evento' : 'Apuntarse'}
        </button>

        ${
          isCreator
            ? `
              <button
                class="edit-btn"
                data-event-id="${event._id}"
              >
                Editar
              </button>

              <button
                class="delete-btn"
                data-event-id="${event._id}"
              >
                Eliminar
              </button>
            `
            : ''
        }
      </div>
    </article>
  `
}
