export const ImagePreviewModal = () => {
  return `
    <div
      id="image-preview-modal"
      class="image-preview-modal hidden"
    >
      <button id="close-image-preview">
        ✕
      </button>

      <img
        id="image-preview"
        src=""
        alt="Vista ampliada del evento"
      >
    </div>
  `
}
