export function initializeCropper(
	file,
	$cropperContainer,
	$imageToCrop,
	cropper,
) {
	const reader = new FileReader()
	reader.onload = function (e) {
		$cropperContainer.removeClass('d-none')
		$imageToCrop.attr('src', e.target.result)

		if (cropper) {
			cropper.destroy()
		}

		cropper = new Cropper($imageToCrop[0], {
			aspectRatio: 1,
			viewMode: 1,
			autoCropArea: 1,
			responsive: true,
			checkOrientation: false,
			ready: function () {
				$('.cropper-crop-box').css({
					'border-radius': '50%',
					overflow: 'hidden',
				})
			},
		})
	}
	reader.readAsDataURL(file)
}
