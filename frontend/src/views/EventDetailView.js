export const EventDetailView = (event) => {
  return `
    <section class="event-detail-view">
      <button
        id="back-to-events"
        class="back-btn"
      >
        ← Volver
      </button>

      <div class="event-detail-card">
        <img
          class="event-detail-image"
          src="${event.image}"
          alt="${event.title}"
        >

        <div class="event-detail-content">
          <div class="event-detail-top">
            <div>
              <h1>
                ${event.title}
              </h1>

              <p class="event-detail-author">
                Creado por @${event.creator?.name}
              </p>
            </div>
          </div>

          <div class="event-detail-meta">
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

          <p class="event-detail-description">
            ${event.description}
          </p>

          <div class="event-detail-attendees">
            <h3>
              Asistentes
            </h3>

            <div class="attendees-list">
              ${
                event.attendees.length
                  ? event.attendees
                      .map(
                        (attendee) => `
                          <span class="attendee-pill">
                            @${attendee.name}
                          </span>
                        `
                      )
                      .join('')
                  : `
                    <p>
                      Todavía no hay asistentes.
                    </p>
                  `
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}
