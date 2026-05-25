export const EventCard = (event) => {
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
    </article>
  `
}
