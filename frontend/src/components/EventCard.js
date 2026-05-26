export const EventCard = (event, user) => {
  const isCreator = user && event.creator?._id === user._id

  return `
    <article class="event-card">
      <div class="event-card-top">
        <h3>${event.title}</h3>

        <span>${event.location}</span>
      </div>

      <p>${event.description}</p>

      <small>
        ${new Date(event.date).toLocaleDateString()}
      </small>

      <div class="event-card-actions">
        <button class="join-btn">
          Apuntarse
        </button>

        ${
          isCreator
            ? `
              <button class="edit-btn">
                Editar
              </button>

              <button class="delete-btn">
                Eliminar
              </button>
            `
            : ''
        }
      </div>
    </article>
  `
}