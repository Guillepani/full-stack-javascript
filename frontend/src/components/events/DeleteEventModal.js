export const DeleteEventModal = () => {
  return `
    <div
      id="delete-modal"
      class="delete-modal hidden"
    >
      <div class="delete-modal-content">
        <h2>
          Eliminar evento
        </h2>

        <p>
          ¿Seguro que quieres eliminar este evento?
        </p>

        <div class="delete-modal-actions">
          <button id="cancel-delete-btn">
            Cancelar
          </button>

          <button id="confirm-delete-btn">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `
}
