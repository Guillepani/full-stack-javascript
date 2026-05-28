export const EventDetailView = (event) => {
  return `
    <section class="event-detail-view">
      <button
        id="back-to-events"
        class="back-btn"
      >
        ← Volver
      </button>

      <article class="event-detail-card">
        <div class="event-detail-image-wrapper">
          <img
            class="event-detail-image"
            src="${event.image}"
            alt="${event.title}"
          >

          <div class="event-detail-overlay"></div>
        </div>

        <div class="event-detail-content">
          <div class="event-detail-top">
            <div>
              <span class="event-detail-tag">
                MeetMoto Event
              </span>

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

          <div class="event-detail-description-box">
            <h3>
              Descripción
            </h3>

            <p class="event-detail-description">
              ${event.description}
            </p>
          </div>

          <div class="event-detail-attendees">
            <div class="event-detail-attendees-top">
              <h3>
                Riders apuntados
              </h3>

              <span>
                ${event.attendees.length}
              </span>
            </div>

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
                    <p class="no-attendees">
                      Todavía no hay asistentes.
                    </p>
                  `
              }
            </div>
          </div>
        </div>
      </article>
    </section>
  `
}
