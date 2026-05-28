export const EditEventModal = () => {
  return `
    <div
      id="edit-modal"
      class="edit-modal hidden"
    >
      <div class="edit-modal-content">
        <h2>
          Editar evento
        </h2>

        <form id="edit-event-form">
          <input
            type="text"
            id="edit-title"
            required
          >

          <input
            type="date"
            id="edit-date"
            required
          >

          <input
            type="time"
            id="edit-time"
            required
          >

          <input
            type="text"
            id="edit-location"
            required
          >

          <textarea
            id="edit-description"
            required
          ></textarea>

          <div class="edit-modal-actions">
            <button
              type="button"
              id="close-edit-modal"
            >
              Cancelar
            </button>

            <button type="submit">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  `
}
