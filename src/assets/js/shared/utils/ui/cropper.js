export function initializeCropper(file, cropperContainerEl, imageToCropEl, cropper) {
  const reader = new FileReader()
  reader.onload = function (e) {
    cropperContainerEl.classList.remove('d-none')
    imageToCropEl.src = e.target.result

    if (cropper) {
      cropper.destroy()
    }

    cropper = new Cropper(imageToCropEl, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      responsive: true,
      checkOrientation: false,
      ready: function () {
        const cropBox = document.querySelector('.cropper-crop-box')
        if (cropBox) {
          cropBox.style.borderRadius = '50%'
          cropBox.style.overflow = 'hidden'
        }
      },
    })
  }
  reader.readAsDataURL(file)
}
