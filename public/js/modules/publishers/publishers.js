/**
 * publishers.js
 *
 * Handles the initialization and behavior of the publishers table,
 * including loading data, configuring modals for creating, viewing,
 * editing, and logically deleting publisher records.
 *
 * Uses the Fetch API to communicate with RESTful endpoints for all publisher-related
 * CRUD operations. Manages UI components such as placeholders, enhanced dropdowns,
 * validation feedback, loading states, image cropping, and tooltips.
 *
 * Also includes features for generating PDF reports and exporting table data to Excel.
 *
 * @author Jason
 */

import {
	loadTableData,
	addRowToTable,
	updateRowInTable,
} from '../../shared/utils/tables/index.js'

import {
	isValidText,
	isValidFoundationYear,
	isValidImageFile,
	validateImageFileUI,
	loadSelectOptions,
	populateSelect,
} from '../../shared/utils/forms/index.js'

import {
	showToast,
	toggleButtonLoading,
	toggleModalLoading,
	placeholderColorSelect,
	placeholderColorEditSelect,
	initializeCropper,
	setupBootstrapSelectDropdownStyles,
} from '../../shared/utils/ui/index.js'

/*****************************************
 * GLOBAL VARIABLES AND HELPER FUNCTIONS
 *****************************************/

// Global list of nationalities and literary genres for the selectpickers
let nationalityList = []
let literaryGenreList = []

function loadOptions() {
	loadSelectOptions({
		url: './api/publishers/select-options',
		onSuccess: (data) => {
			nationalityList = data.nationalities
			literaryGenreList = data.literaryGenres
		},
	})
}

// Global variable to handle photo deletion in edit modal
let deletePhotoFlag = false

/*****************************************
 * TABLE HANDLING
 *****************************************/

function generateRow(publisher) {
	const userRole = sessionStorage.getItem('userRole')

	return `
		<tr>
			<td class="align-middle text-start">
				<span class="badge bg-body-tertiary text-body-emphasis border">${publisher.formattedPublisherId}</span>
			</td>
			<td class="align-middle text-start">${publisher.name}</td>
			<td class="align-middle text-start">
				<span class="badge bg-body-secondary text-body-emphasis border">${publisher.nationalityName}</span>
			</td>
			<td class="align-middle text-start">
				<span class="badge bg-body-secondary text-body-emphasis border">${publisher.literaryGenreName}</span>
			</td>
			<td class="align-middle text-start">
				<a href="${publisher.website}" target="_blank">${publisher.website}</a>
			</td>
			<td class="align-middle text-center">
				${
					publisher.status === 'activo'
						? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
						: '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>'
				}
			</td>
			<td class="align-middle text-center">
				${
					publisher.photoUrl
						? `<img src="${publisher.photoUrl}" alt="Foto de la Editorial" class="img-fluid rounded-circle" style="width: 23px; height: 23px;">`
						: `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi-person-circle" viewBox="0 0 16 16">
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
						<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
					</svg>`
				}
			</td>
            <td class="align-middle text-center">
				<div class="d-inline-flex gap-2">
					<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Detalles"
						data-bs-toggle="modal" data-bs-target="#detailsModal" data-id="${publisher.publisherId}" data-formatted-id="${publisher.formattedPublisherId}">
						<i class="bi bi-info-circle"></i>
					</button>
					${
						userRole === 'administrador'
							? `<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Editar"
							data-bs-toggle="modal" data-bs-target="#editModal" data-id="${publisher.publisherId}" data-formatted-id="${publisher.formattedPublisherId}">
							<i class="bi bi-pencil"></i>
						</button>`
							: ''
					}
				</div>
			</td>
		</tr>
	`
}

function addRow(publisher) {
	addRowToTable(publisher, generateRow)
}

function loadData() {
	loadTableData({
		apiUrl: './api/publishers',
		generateRow,
		generatePDF,
		generateExcel,
	})
}

function updateRow(publisher) {
	updateRowInTable({
		entity: publisher,
		getFormattedId: (p) => p.formattedPublisherId?.toString(),
		updateCellsFn: (row, p) => {
			row.find('td').eq(1).text(p.name)
			row.find('td').eq(2).find('span').text(p.nationalityName)
			row.find('td').eq(3).find('span').text(p.literaryGenreName)
			row.find('td').eq(4).find('a').attr('href', p.website).text(p.website)
			row
				.find('td')
				.eq(5)
				.html(
					p.status === 'activo'
						? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
						: '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>',
				)
			row
				.find('td')
				.eq(6)
				.html(
					p.photoUrl?.trim()
						? `<img src="${p.photoUrl}" alt="Foto de la Editorial" class="img-fluid rounded-circle" style="width: 23px; height: 23px;">`
						: `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi-person-circle" viewBox="0 0 16 16">
							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
							<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
						</svg>`,
				)
		},
	})
}

/*****************************************
 * FORM LOGIC
 *****************************************/

function handleAddForm() {
	let isFirstSubmit = true

	$('#addModal').on('hidden.bs.modal', function () {
		isFirstSubmit = true
		$('#addForm').data('submitted', false)
	})

	$('#addForm').on('input change', 'input, select', function () {
		if (!isFirstSubmit) {
			validateAddField($(this))
		}
	})

	$('#addForm').on('submit', async function (event) {
		event.preventDefault()

		if ($(this).data('submitted') === true) return
		$(this).data('submitted', true)

		if (isFirstSubmit) isFirstSubmit = false

		const form = $(this)[0]
		let isValid = true

		$(form)
			.find('input, select')
			.not('.bootstrap-select input[type="search"]')
			.each(function () {
				if (!validateAddField($(this))) isValid = false
			})

		if (!isValid) {
			$(this).data('submitted', false)
			return
		}

		const formData = new FormData(form)
		const raw = Object.fromEntries(formData.entries())

		const publisher = {
			name: raw.name,
			nationalityId: parseInt(raw.nationality),
			literaryGenreId: parseInt(raw.literaryGenre),
			foundationYear: parseInt(raw.foundationYear),
			website: raw.website || '',
			address: raw.address || '',
			status: raw.status,
			photoUrl: null, // 🔜 Preparado para Cloudinary
		}

		const submitButton = $('#addBtn')
		toggleButtonLoading(submitButton, true)

		try {
			if (cropper) {
				const photoBlob = await new Promise((resolve) => {
					cropper
						.getCroppedCanvas({ width: 460, height: 460 })
						.toBlob((blob) => resolve(blob), 'image/jpeg', 0.7)
				})

				if (photoBlob) {
					// 🔜 Preparado para Cloudinary
				}
			}

			const response = await fetch('./api/publishers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(publisher),
			})

			const json = await response.json()

			if (response.ok && json.success) {
				addRow(json.data)
				$('#addModal').modal('hide')
				showToast('Editorial agregada exitosamente.', 'success')
			} else {
				console.error(
					`Backend error (${json.errorType} - ${json.statusCode}):`,
					json.message,
				)
				$('#addModal').modal('hide')
				showToast('Hubo un error al agregar la editorial.', 'error')
			}
		} catch (err) {
			console.error('Unexpected error:', err)
			showToast('Hubo un error inesperado.', 'error')
			$('#addModal').modal('hide')
		} finally {
			toggleButtonLoading(submitButton, false)
		}
	})
}

function validateAddField(field) {
	if (
		field.attr('type') === 'search' ||
		field.is('#addWebsite') ||
		field.is('#addAddress')
	) {
		return true
	}

	let errorMessage = 'Este campo es obligatorio.'
	let isValid = true

	// Default validation
	if (!field.val() || (field[0].checkValidity && !field[0].checkValidity())) {
		field.addClass('is-invalid')
		field.siblings('.invalid-feedback').html(errorMessage)
		isValid = false
	} else {
		field.removeClass('is-invalid')
	}

	// Name validation
	if (field.is('#addName')) {
		const result = isValidText(field.val(), 'nombre')
		if (!result.valid) {
			isValid = false
			errorMessage = result.message
		}
	}

	// Foundation year validation
	if (field.is('#addFoundationYear')) {
		const result = isValidFoundationYear(field.val())
		if (!result.valid) {
			errorMessage = result.message
			isValid = false
		}
	}

	// Photo validation
	if (field.is('#addPhoto')) {
		const file = field[0].files[0]
		const result = isValidImageFile(file)

		if (!result.valid) {
			isValid = false
			errorMessage = result.message
		} else {
			field.removeClass('is-invalid')
			return true
		}
	}

	// Select validation
	if (field.is('select')) {
		const container = field.closest('.bootstrap-select')
		container.toggleClass('is-invalid', field.hasClass('is-invalid'))
		container.siblings('.invalid-feedback').html(errorMessage)
	}

	if (!isValid) {
		field.addClass('is-invalid')
		field.siblings('.invalid-feedback').html(errorMessage).show()
	} else {
		field.removeClass('is-invalid')
		field.siblings('.invalid-feedback').hide()
	}

	return isValid
}

$('#addPhoto, #editPhoto').on('change', function () {
	validateImageFileUI($(this))
})

function handleEditForm() {
	let isFirstSubmit = true

	$('#editModal').on('hidden.bs.modal', function () {
		isFirstSubmit = true
		$('#editForm').data('submitted', false)
	})

	$('#editForm').on('input change', 'input, select', function () {
		if (!isFirstSubmit) {
			validateEditField($(this))
		}
	})

	$('#editForm').on('submit', async function (event) {
		event.preventDefault()

		if ($(this).data('submitted') === true) return
		$(this).data('submitted', true)

		if (isFirstSubmit) isFirstSubmit = false

		const form = $(this)[0]
		let isValid = true

		$(form)
			.find('input, select')
			.not('.bootstrap-select input[type="search"]')
			.each(function () {
				if (!validateEditField($(this))) isValid = false
			})

		if (!isValid) {
			$(this).data('submitted', false)
			return
		}

		const publisherId = $('#editForm').data('publisherId')
		const formData = new FormData(form)
		const raw = Object.fromEntries(formData.entries())

		const publisher = {
			publisherId: parseInt(publisherId),
			name: raw.name,
			nationalityId: parseInt(raw.nationality),
			literaryGenreId: parseInt(raw.literaryGenre),
			foundationYear: parseInt(raw.foundationYear),
			website: raw.website || '',
			address: raw.address || '',
			status: raw.status,
			deletePhoto: deletePhotoFlag || false,
			photoUrl: null, // 🔜 Preparado para Cloudinary
		}

		const submitButton = $('#updateBtn')
		toggleButtonLoading(submitButton, true)

		try {
			if (cropper) {
				const photoBlob = await new Promise((resolve) => {
					cropper
						.getCroppedCanvas({ width: 460, height: 460 })
						.toBlob((blob) => resolve(blob), 'image/jpeg', 0.7)
				})

				if (photoBlob) {
					// 🔜 Preparado para Cloudinary
				}
			}

			const response = await fetch('./api/publishers', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(publisher),
			})

			const json = await response.json()

			if (response.ok && json.success) {
				updateRow(json.data)
				$('#editModal').modal('hide')
				showToast('Editorial actualizada exitosamente.', 'success')
			} else {
				console.error(
					`Backend error (${json.errorType} - ${json.statusCode}):`,
					json.message,
				)
				showToast(
					json.message || 'Hubo un error al actualizar la editorial.',
					'error',
				)
				$('#editModal').modal('hide')
			}
		} catch (err) {
			console.error('Unexpected error:', err)
			showToast('Hubo un error inesperado.', 'error')
			$('#editModal').modal('hide')
		} finally {
			toggleButtonLoading(submitButton, false)
		}
	})
}

function validateEditField(field) {
	if (
		field.attr('type') === 'search' ||
		field.is('#editWebsite') ||
		field.is('#editAddress')
	) {
		return true
	}

	let errorMessage = 'Este campo es obligatorio.'
	let isValid = true

	// Default validation
	if (!field.val() || (field[0].checkValidity && !field[0].checkValidity())) {
		field.addClass('is-invalid')
		field.siblings('.invalid-feedback').html(errorMessage)
		isValid = false
	} else {
		field.removeClass('is-invalid')
	}

	// Name validation
	if (field.is('#editName')) {
		const result = isValidText(field.val(), 'nombre')
		if (!result.valid) {
			isValid = false
			errorMessage = result.message
		}
	}

	// Foundation year validation
	if (field.is('#editFoundationYear')) {
		const result = isValidFoundationYear(field.val())
		if (!result.valid) {
			errorMessage = result.message
			isValid = false
		}
	}

	// Photo validation
	if (field.is('#editPhoto')) {
		const file = field[0].files[0]
		const result = isValidImageFile(file)

		if (!result.valid) {
			isValid = false
			errorMessage = result.message
		} else {
			field.removeClass('is-invalid')
			return true
		}
	}

	// Select validation
	if (field.is('select')) {
		const container = field.closest('.bootstrap-select')
		container.toggleClass('is-invalid', field.hasClass('is-invalid'))
		container
			.siblings('.invalid-feedback')
			.html('Opción seleccionada inactiva o no existente.')
	}

	if (!isValid) {
		field.addClass('is-invalid')
		field.siblings('.invalid-feedback').html(errorMessage).show()
	} else {
		field.removeClass('is-invalid')
		field.siblings('.invalid-feedback').hide()
	}

	return isValid
}

/*****************************************
 * MODAL MANAGEMENT
 *****************************************/

function loadModalData() {
	// Add Modal
	$(document).on('click', '[data-bs-target="#addModal"]', function () {
		populateSelect('#addNationality', nationalityList, 'nationalityId', 'name')
		$('#addNationality').selectpicker()

		populateSelect(
			'#addLiteraryGenre',
			literaryGenreList,
			'literaryGenreId',
			'name',
		)
		$('#addLiteraryGenre').selectpicker()

		$('#addStatus')
			.selectpicker('destroy')
			.empty()
			.append(
				$('<option>', {
					value: 'activo',
					text: 'Activo',
				}),
				$('<option>', {
					value: 'inactivo',
					text: 'Inactivo',
				}),
			)
		$('#addStatus').selectpicker()

		$('#defaultAddPhotoContainer').removeClass('d-none')
		$('#deleteAddPhotoBtn').addClass('d-none')

		$('#addForm')[0].reset()
		$('#addForm .is-invalid').removeClass('is-invalid')

		$('#cropperContainerAdd').addClass('d-none')

		if (cropper) {
			cropper.destroy()
			cropper = null
		}
	})

	// Details Modal
	$(document).on('click', '[data-bs-target="#detailsModal"]', function () {
		const publisherId = $(this).data('id')
		$('#detailsModalID').text($(this).data('formatted-id'))

		toggleModalLoading(this, true)

		fetch(`./api/publishers/${encodeURIComponent(publisherId)}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async (response) => {
				if (!response.ok) {
					const errorData = await response.json()
					throw { status: response.status, ...errorData }
				}
				return response.json()
			})
			.then((data) => {
				$('#detailsID').text(data.formattedPublisherId)
				$('#detailsName').text(data.name)
				$('#detailsNationality').text(data.nationalityName)
				$('#detailsGenre').text(data.literaryGenreName)
				$('#detailsYear').text(data.foundationYear)
				$('#detailsWebsite a').attr('href', data.website).text(data.website)
				$('#detailsAddress').text(data.address)

				$('#detailsStatus').html(
					data.status === 'activo'
						? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
						: '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>',
				)

				if (data.photoUrl) {
					$('#detailsImg').attr('src', data.photoUrl).removeClass('d-none')
					$('#detailsSvg').addClass('d-none')
				} else {
					$('#detailsImg').addClass('d-none')
					$('#detailsSvg').removeClass('d-none')
				}

				toggleModalLoading(this, false)
			})
			.catch((error) => {
				console.error(
					`Error loading publisher details (${error.errorType || 'unknown'} - ${error.status}):`,
					error.message || error,
				)
				showToast(
					'Hubo un error al cargar los detalles de la editorial.',
					'error',
				)
				$('#detailsModal').modal('hide')
			})
	})

	// Edit Modal
	$(document).on('click', '[data-bs-target="#editModal"]', function () {
		const publisherId = $(this).data('id')
		$('#editModalID').text($(this).data('formatted-id'))

		toggleModalLoading(this, true)

		fetch(`./api/publishers/${encodeURIComponent(publisherId)}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(async (response) => {
				if (!response.ok) {
					const errorData = await response.json()
					throw { status: response.status, ...errorData }
				}
				return response.json()
			})
			.then((data) => {
				$('#editForm').data('publisherId', data.publisherId)
				$('#editName').val(data.name)

				populateSelect(
					'#editNationality',
					nationalityList,
					'nationalityId',
					'name',
				)
				$('#editNationality').val(data.nationalityId).selectpicker()

				populateSelect(
					'#editLiteraryGenre',
					literaryGenreList,
					'literaryGenreId',
					'name',
				)
				$('#editLiteraryGenre').val(data.literaryGenreId).selectpicker()

				$('#editFoundationYear').val(data.foundationYear)
				$('#editWebsite').val(data.website)
				$('#editAddress').val(data.address)

				$('#editStatus')
					.selectpicker('destroy')
					.empty()
					.append(
						$('<option>', { value: 'activo', text: 'Activo' }),
						$('<option>', { value: 'inactivo', text: 'Inactivo' }),
					)
				$('#editStatus').val(data.status).selectpicker()

				updateEditImageContainer(data.photoUrl)

				$('#editForm .is-invalid').removeClass('is-invalid')
				placeholderColorEditSelect()

				$('#editForm')
					.find('select')
					.each(function () {
						validateEditField($(this), true)
					})

				$('#editPhoto').val('')

				toggleModalLoading(this, false)
			})
			.catch((error) => {
				console.error(
					`Error loading publisher details for editing (${error.errorType || 'unknown'} - ${error.status}):`,
					error.message || error,
				)
				showToast('Hubo un error al cargar los datos de la editorial.', 'error')
				$('#editModal').modal('hide')
			})

		// Reset cropper container
		$('#cropperContainerEdit').addClass('d-none')
		if (cropper) {
			cropper.destroy()
			cropper = null
		}
	})
}

function updateEditImageContainer(photoUrl) {
	const $editImageContainer = $('#currentEditPhotoContainer')
	const $deleteEditPhotoBtn = $('#deleteEditPhotoBtn')

	$editImageContainer.empty()

	if (photoUrl) {
		$editImageContainer.html(
			`<img src="${photoUrl}" class="img-fluid rounded-circle" alt="Foto de la Editorial">`,
		)
		$deleteEditPhotoBtn.removeClass('d-none')
	} else {
		$editImageContainer.html(
			`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="currentColor" class="bi-person-circle" viewBox="0 0 16 16">
				<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
				<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>`,
		)
		$deleteEditPhotoBtn.addClass('d-none')
	}
	$editImageContainer.removeClass('d-none')
}

$('#deleteAddPhotoBtn').on('click', function () {
	$(this).addClass('d-none')

	if (cropper) {
		cropper.destroy()
		cropper = null
	}
	$('#cropperContainerAdd').addClass('d-none')
	$('#addPhoto').val('')
	$('#defaultAddPhotoContainer').removeClass('d-none')
})

$('#deleteEditPhotoBtn').on('click', function () {
	deletePhotoFlag = true
	updateEditImageContainer(null)

	$(this).addClass('d-none')

	if (cropper) {
		cropper.destroy()
		cropper = null
	}
	$('#cropperContainerEdit').addClass('d-none')
	$('#editPhoto').val('')
})

let cropper
const $cropperContainerAdd = $('#cropperContainerAdd')
const $imageToCropAdd = $('#imageToCropAdd')
const $cropperContainerEdit = $('#cropperContainerEdit')
const $imageToCropEdit = $('#imageToCropEdit')

$('#addPhoto, #editPhoto').on('change', function () {
	const file = this.files[0]
	deletePhotoFlag = false

	$('#deleteAddPhotoBtn').addClass('d-none')
	$('#deleteEditPhotoBtn').addClass('d-none')

	if (
		file &&
		['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
	) {
		$('#defaultAddPhotoContainer').addClass('d-none')
		$('#currentEditPhotoContainer').addClass('d-none')

		$('#deleteAddPhotoBtn').removeClass('d-none')
		$('#deleteEditPhotoBtn').removeClass('d-none')

		let $container, $image
		if ($(this).is('#addPhoto')) {
			$container = $cropperContainerAdd
			$image = $imageToCropAdd
		} else {
			$container = $cropperContainerEdit
			$image = $imageToCropEdit
		}
		initializeCropper(file, $container, $image, cropper)
	} else {
		if ($(this).is('#addPhoto')) {
			$cropperContainerAdd.addClass('d-none')
			if (cropper) {
				cropper.destroy()
				cropper = null
			}
			$('#defaultAddPhotoContainer').removeClass('d-none')
		} else {
			$cropperContainerEdit.addClass('d-none')
			if (cropper) {
				cropper.destroy()
				cropper = null
			}
			$('#currentEditPhotoContainer').removeClass('d-none')
		}

		if ($('#currentEditPhotoContainer').find('img').length > 0) {
			$('#deleteEditPhotoBtn').removeClass('d-none')
		}
	}
})

function generatePDF(dataTable) {
	const pdfBtn = $('#generatePDF')
	toggleButtonLoading(pdfBtn, true)

	let hasWarnings = false

	try {
		const { jsPDF } = window.jspdf
		const doc = new jsPDF('p', 'mm', 'a4')
		const logoUrl = '/images/bookstudio-logo-no-bg.png'

		const currentDate = new Date()
		const fecha = currentDate.toLocaleDateString('es-ES', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		})
		const hora = currentDate.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		})

		const pageWidth = doc.internal.pageSize.getWidth()
		const margin = 10
		const topMargin = 5

		try {
			doc.addImage(logoUrl, 'PNG', margin, topMargin - 5, 30, 30)
		} catch (imgError) {
			console.warn('Logo not available:', imgError)
			showToast('No se pudo cargar el logo. Se continuará sin él.', 'warning')
			hasWarnings = true
		}

		doc.setFont('helvetica', 'bold')
		doc.setFontSize(14)
		doc.text('Lista de editoriales', pageWidth / 2, topMargin + 13, {
			align: 'center',
		})

		doc.setFont('helvetica', 'normal')
		doc.setFontSize(8)
		doc.text(`Fecha: ${fecha}`, pageWidth - margin, topMargin + 10, {
			align: 'right',
		})
		doc.text(`Hora: ${hora}`, pageWidth - margin, topMargin + 15, {
			align: 'right',
		})

		const data = dataTable
			.rows({ search: 'applied' })
			.nodes()
			.toArray()
			.map((row) => {
				let estado = row.cells[5].innerText.trim()
				estado = estado.includes('Activo') ? 'Activo' : 'Inactivo'

				return [
					row.cells[0].innerText.trim(),
					row.cells[1].innerText.trim(),
					row.cells[2].innerText.trim(),
					row.cells[3].innerText.trim(),
					row.cells[4].innerText.trim(),
					estado,
				]
			})

		doc.autoTable({
			startY: topMargin + 25,
			margin: { left: margin, right: margin },
			head: [
				[
					'Código',
					'Nombre',
					'Nacionalidad',
					'Género literario',
					'Página web',
					'Estado',
				],
			],
			body: data,
			theme: 'grid',
			headStyles: {
				fillColor: [0, 0, 0],
				textColor: 255,
				fontStyle: 'bold',
				fontSize: 8,
				halign: 'left',
			},
			bodyStyles: {
				font: 'helvetica',
				fontSize: 7,
				halign: 'left',
			},
			didParseCell: function (data) {
				if (data.section === 'body' && data.column.index === 4) {
					data.cell.styles.textColor = [0, 0, 255]
				}
				if (data.section === 'body' && data.column.index === 5) {
					data.cell.styles.textColor =
						data.cell.raw === 'Activo' ? [0, 128, 0] : [255, 0, 0]
				}
			},
			didDrawCell: function (data) {
				if (data.section === 'body' && data.column.index === 4) {
					const url = data.cell.raw
					const pos = data.cell.textPos
					if (url && url.trim() !== '' && pos) {
						doc.textWithLink('', pos.x, pos.y, { url })
					}
				}
			},
		})

		const filename = `Lista_de_editoriales_bookstudio_${fecha.replace(/\s+/g, '_')}.pdf`

		const pdfBlob = doc.output('blob')
		const blobUrl = URL.createObjectURL(pdfBlob)
		const link = document.createElement('a')
		link.href = blobUrl
		link.download = filename
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)

		if (!hasWarnings) {
			showToast('PDF generado exitosamente.', 'success')
		}
	} catch (error) {
		console.error('Error generating PDF file:', error)
		showToast(
			'Ocurrió un error al generar el PDF. Inténtalo nuevamente.',
			'error',
		)
	} finally {
		toggleButtonLoading(pdfBtn, false)
	}
}

function generateExcel(dataTable) {
	const excelBtn = $('#generateExcel')
	toggleButtonLoading(excelBtn, true)

	try {
		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Editoriales')

		const currentDate = new Date()
		const dateStr = currentDate.toLocaleDateString('es-ES', {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
		})
		const timeStr = currentDate.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		})

		worksheet.mergeCells('A1:F1')
		const titleCell = worksheet.getCell('A1')
		titleCell.value = 'Lista de editoriales - BookStudio'
		titleCell.font = { name: 'Arial', size: 14, bold: true }
		titleCell.alignment = { horizontal: 'center' }

		worksheet.mergeCells('A2:F2')
		const dateTimeCell = worksheet.getCell('A2')
		dateTimeCell.value = `Fecha: ${dateStr}  Hora: ${timeStr}`
		dateTimeCell.alignment = { horizontal: 'center' }

		worksheet.columns = [
			{ key: 'id', width: 10 },
			{ key: 'nombre', width: 30 },
			{ key: 'nacionalidad', width: 25 },
			{ key: 'genero', width: 30 },
			{ key: 'pagina', width: 50 },
			{ key: 'estado', width: 15 },
		]

		const headerRow = worksheet.getRow(4)
		headerRow.values = [
			'Código',
			'Nombre',
			'Nacionalidad',
			'Género literario',
			'Página web',
			'Estado',
		]
		headerRow.eachCell((cell) => {
			cell.font = { bold: true, color: { argb: 'FFFFFF' } }
			cell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: '000000' },
			}
			cell.alignment = { horizontal: 'left', vertical: 'middle' }
			cell.border = {
				top: { style: 'thin', color: { argb: 'FFFFFF' } },
				bottom: { style: 'thin', color: { argb: 'FFFFFF' } },
				left: { style: 'thin', color: { argb: 'FFFFFF' } },
				right: { style: 'thin', color: { argb: 'FFFFFF' } },
			}
		})

		const data = dataTable
			.rows({ search: 'applied' })
			.nodes()
			.toArray()
			.map((row) => {
				let estado = row.cells[5].innerText.trim()
				estado = estado.includes('Activo') ? 'Activo' : 'Inactivo'

				return {
					id: row.cells[0].innerText.trim(),
					nombre: row.cells[1].innerText.trim(),
					nacionalidad: row.cells[2].innerText.trim(),
					genero: row.cells[3].innerText.trim(),
					pagina: row.cells[4].innerText.trim(),
					estado: estado,
				}
			})

		data.forEach((item) => {
			const row = worksheet.addRow(item)

			const paginaCell = row.getCell(5)
			if (item.pagina && item.pagina.trim() !== '') {
				paginaCell.value = {
					text: item.pagina,
					hyperlink: item.pagina,
				}
				paginaCell.font = { color: { argb: '0000FF' }, underline: true }
			} else {
				paginaCell.value = ''
			}

			const estadoCell = row.getCell(6)
			if (estadoCell.value === 'Activo') {
				estadoCell.font = { color: { argb: '008000' } }
				estadoCell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: 'E6F2E6' },
				}
			} else {
				estadoCell.font = { color: { argb: 'FF0000' } }
				estadoCell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: 'FFE6E6' },
				}
			}
		})

		const filename = `Lista_de_editoriales_bookstudio_${dateStr.replace(/\s+/g, '_')}.xlsx`

		workbook.xlsx
			.writeBuffer()
			.then((buffer) => {
				const blob = new Blob([buffer], {
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				})
				const link = document.createElement('a')
				link.href = URL.createObjectURL(blob)
				link.download = filename
				link.click()

				showToast('Excel generado exitosamente.', 'success')
			})
			.catch((error) => {
				console.error('Error generating Excel file:', error)
				showToast('Ocurrió un error al generar el Excel.', 'error')
			})
			.finally(() => {
				toggleButtonLoading(excelBtn, false)
			})
	} catch (error) {
		console.error('General error while generating Excel file:', error)
		showToast('Ocurrió un error inesperado al generar el Excel.', 'error')
		toggleButtonLoading(excelBtn, false)
	}
}

/*****************************************
 * INITIALIZATION
 *****************************************/

$(document).ready(function () {
	loadData()
	handleAddForm()
	handleEditForm()
	loadModalData()
	loadOptions()
	$('.selectpicker').selectpicker()
	setupBootstrapSelectDropdownStyles()
	placeholderColorSelect()
})
