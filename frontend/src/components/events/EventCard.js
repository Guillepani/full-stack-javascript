const user = JSON.parse(localStorage.getItem('user'))

export const EventCard = (event) => {
  const isCreator = user?._id === event.creator._id

  const isAttending = event.attendees.some(
    (attendee) => attendee._id === user?._id
  )

  return `
    <article class="event-card">
      <div class="event-image-wrapper">
        <img
          class="event-image"
          src="${event.image}"
          alt="${event.title}"
        >

        <div class="event-image-overlay"></div>

        <div class="event-image-content">
          <div class="event-image-top">
            <div class="event-user">
              <div class="event-user-avatar">
                ${event.creator?.name?.charAt(0).toUpperCase() || 'M'}
              </div>

              <span>
                @${event.creator?.name || 'Usuario'}
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

          <div class="event-image-bottom">
            <div class="event-main-info">
              <h3>
                ${event.title}
              </h3>

              <span class="event-location">
                📍 ${event.location}
              </span>
            </div>

            <div class="event-meta">
              <small>
                📅 ${new Date(event.date).toLocaleDateString()}
              </small>

              <small>
                👥 ${event.attendees.length}
              </small>
            </div>
          </div>
        </div>
      </div>

      <div class="event-card-body">
        <p class="event-description">
          ${event.description}
        </p>

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

          ${
            isCreator
              ? `
                <button
                  class="edit-btn"
                  data-event-id="${event._id}"
                  data-title="${event.title}"
                  data-location="${event.location}"
                  data-description="${event.description}"
                  data-date="${event.date.split('T')[0]}"
                  data-time="${event.time}"
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
      </div>
    </article>
  `
}
