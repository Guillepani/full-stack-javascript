export const ProfileView = (user, events) => {
  const createdEvents = events.filter(
    (event) => event.creator?._id === user._id
  )

  const attendingEvents = events.filter((event) =>
    event.attendees?.some((attendee) => attendee._id === user._id)
  )

  return `
    <section class="profile-view">
      <div class="profile-header">
        <h2>
          @${user.name}
        </h2>

        <p>
          Dashboard personal
        </p>
      </div>

      <section class="profile-section">
        <h3>
          Eventos creados
        </h3>

        <div class="profile-events-grid">
          ${
            createdEvents.length
              ? createdEvents
                  .map(
                    (event) => `
                      <article class="mini-event-card">
                        <img
                          src="${event.image}"
                          alt="${event.title}"
                        >

                        <h4>
                          ${event.title}
                        </h4>
                      </article>
                    `
                  )
                  .join('')
              : `
                <p>
                  No has creado eventos.
                </p>
              `
          }
        </div>
      </section>

      <section class="profile-section">
        <h3>
          Eventos a los que asistes
        </h3>

        <div class="profile-events-grid">
          ${
            attendingEvents.length
              ? attendingEvents
                  .map(
                    (event) => `
                      <article class="mini-event-card">
                        <img
                          src="${event.image}"
                          alt="${event.title}"
                        >

                        <h4>
                          ${event.title}
                        </h4>
                      </article>
                    `
                  )
                  .join('')
              : `
                <p>
                  No asistes a eventos.
                </p>
              `
          }
        </div>
      </section>
    </section>
  `
}
