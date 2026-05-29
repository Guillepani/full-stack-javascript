const user = JSON.parse(localStorage.getItem('user'))

export const EventCard = (event) => {
  const isCreator = user?._id === event.creator?._id

  const isAttending = event.attendees.some(
    (attendee) => attendee._id === user?._id
  )

  return `
    <article class="event-card">
      <div class="event-card-header">
        <div class="event-user">
          <div class="event-user-avatar">
            ${event.creator?.name?.charAt(0).toUpperCase() || 'M'}
          </div>

          <span class="event-user-name">
            ${event.creator?.name || 'Usuario'}
          </span>
        </div>
      </div>

      <div class="event-image-wrapper">
        <img
          class="event-image"
          src="${event.image}"
          alt="${event.title}"
        >
      </div>

      <div class="event-card-body">
        <h3 class="event-title">
          ${event.title}
        </h3>

        <div class="event-info">
          <span>
            📍 ${event.location}
          </span>

          <span>
            📅 ${new Date(event.date).toLocaleDateString()}
          </span>

          <span>
            🕒 ${event.time}
          </span>

          <span>
            👥 ${event.attendees.length} asistentes
          </span>
        </div>

        <div class="event-actions">
          <button
            class="details-btn"
            data-event-id="${event._id}"
          >
            Ver evento
          </button>

          <button
            class="join-btn"
            data-event-id="${event._id}"
          >
            ${isAttending ? 'Salir' : 'Apuntarse'}
          </button>
        </div>

        ${
          isCreator
            ? `
              <div class="event-owner-actions">
                <button
                  class="edit-btn"
                  data-event-id="${event._id}"
                  data-title="${event.title}"
                  data-location="${event.location}"
                  data-description="${event.description}"
                  data-date="${event.date.split('T')[0]}"
                  data-time="${event.time}"
                >
                  Editar evento
                </button>

                <button
                  class="delete-btn"
                  data-event-id="${event._id}"
                >
                  Eliminar evento
                </button>
              </div>
            `
            : ''
        }
      </div>
    </article>
  `
}
