/**
 * loans.js
 *
 * Handles the initialization and behavior of the loans table,
 * including loading data, configuring modals for creating, viewing,
 * returning, and editing loan records.
 *
 * Uses the Fetch API to communicate with RESTful endpoints for all loan-related
 * CRUD operations. Manages UI components such as placeholders, enhanced dropdowns,
 * validation feedback, loading states, and tooltips.
 *
 * Also includes features for generating PDF receipts and exporting table data to Excel.
 *
 * @author Jason
 */

import {
	loadTableData,
	addRowToTable,
	updateRowInTable,
} from '../../shared/utils/tables/index.js'

import {
	isValidReturnDate,
	isValidLoanQuantity,
	loadSelectOptions,
	populateSelect,
} from '../../shared/utils/forms/index.js'

import {
	showToast,
	toggleButtonLoading,
	toggleModalLoading,
	placeholderColorSelect,
	placeholderColorEditSelect,
	placeholderColorDateInput,
	setupBootstrapSelectDropdownStyles,
	getCurrentPeruDate,
} from '../../shared/utils/ui/index.js'

/*****************************************
 * GLOBAL VARIABLES AND HELPER FUNCTIONS
 *****************************************/

// Global list of books and students for the selectpickers
let bookList = []
let studentList = []

function loadOptions() {
	loadSelectOptions({
		url: './api/loans/select-options',
		onSuccess: (data) => {
			bookList = data.books
			studentList = data.students

			document.getElementById('addBook').addEventListener('change', (event) => {
				const selectedBookId = event.target.value
				const selectedBook = bookList.find(
					(book) => book.bookId == selectedBookId,
				)

				if (selectedBook) {
					const availableCopies = selectedBook.availableCopies
					document
						.getElementById('addQuantity')
						.setAttribute('max', availableCopies)
				}
			})
		},
	})
}

/*****************************************
 * TABLE HANDLING
 *****************************************/

function generateRow(loan) {
	return `
		<tr>
			<td class="align-middle text-start">
				<span class="badge bg-body-tertiary text-body-emphasis border">${loan.formattedLoanId}</span>
			</td>
			<td class="align-middle text-start">
				${loan.bookTitle}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${loan.formattedBookId}</span>
			</td>
			<td class="align-middle text-start">
				${loan.studentFullName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${loan.formattedStudentId}</span>
			</td>
			<td class="align-middle text-center">${moment(loan.loanDate).format('DD MMM YYYY')}</td>
			<td class="align-middle text-center">${moment(loan.returnDate).format('DD MMM YYYY')}</td>
			<td class="align-middle text-center">
				<span class="badge bg-body-secondary text-body-emphasis border">${loan.quantity}</span>
			</td>
			<td class="align-middle text-center">
				${
					loan.status === 'prestado'
						? '<span class="badge text-warning-emphasis bg-warning-subtle border border-warning-subtle">Prestado</span>'
						: '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Devuelto</span>'
				}
			</td>
			<td class="align-middle text-center">
				<div class="d-inline-flex gap-2">
					<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Detalles"
						data-bs-toggle="modal" data-bs-target="#detailsModal" data-id="${loan.loanId}" data-formatted-id="${loan.formattedLoanId}">
						<i class="bi bi-info-circle"></i>
					</button>
					${
						loan.status === 'prestado'
							? `<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Devolver" 
							data-bs-toggle="modal" data-bs-target="#returnModal" aria-label="Devolver el préstamo"
							data-id="${loan.loanId}" data-formatted-id="${loan.formattedLoanId}" data-status="${loan.status}">
							<i class="bi bi-check2-square"></i>
						</button>`
							: ''
					}
					<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Editar"
						data-bs-toggle="modal" data-bs-target="#editModal" data-id="${loan.loanId}" data-formatted-id="${loan.formattedLoanId}">
						<i class="bi bi-pencil"></i>
					</button>
				</div>
			</td>
		</tr>
	`
}

function addRow(loan) {
	addRowToTable(loan, generateRow)
}

function loadData() {
	loadTableData({
		apiUrl: './api/loans',
		generateRow,
		generatePDF,
		generateExcel,
	})
}

function updateRow(loan) {
	updateRowInTable({
		entity: loan,
		getFormattedId: (l) => l.formattedLoanId?.toString(),
		updateCellsFn: (row, l) => {
			row.find('td').eq(2).html(`
				${l.studentFullName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${l.formattedStudentId}</span>
			`)
			row.find('td').eq(4).text(moment(l.returnDate).format('DD MMM YYYY'))
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

		const loan = {
			bookId: parseInt(raw.book),
			studentId: parseInt(raw.student),
			returnDate: raw.returnDate,
			quantity: parseInt(raw.quantity),
			observation: raw.observation || '',
		}

		const submitButton = $('#addBtn')
		toggleButtonLoading(submitButton, true)

		try {
			const response = await fetch('./api/loans', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(loan),
			})

			const json = await response.json()

			if (response.ok && json.success) {
				addRow(json.data)
				$('#addModal').modal('hide')
				showToast('Préstamo agregado exitosamente.', 'success')
				generateLoanReceipt(json.data)
			} else {
				console.error(
					`Backend error (${json.errorType} - ${json.statusCode}):`,
					json.message,
				)
				$('#addModal').modal('hide')
				showToast('Hubo un error al agregar el préstamo.', 'error')
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
	if (field.attr('type') === 'search') {
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

	// Return date validation
	if (field.is('#addReturnDate') && $('#addLoanDate').val()) {
		const result = isValidReturnDate($('#addLoanDate').val(), field.val())
		if (!result.valid) {
			field.addClass('is-invalid')
			errorMessage = result.message
			field.siblings('.invalid-feedback').html(errorMessage)
			isValid = false
		}
	}

	// Quantity validation
	if (field.is('#addQuantity')) {
		const result = isValidLoanQuantity(
			parseInt(field.val(), 10),
			parseInt(field.attr('max'), 10),
		)
		if (!result.valid) {
			field.addClass('is-invalid')
			errorMessage = result.message
			field.siblings('.invalid-feedback').html(errorMessage)
			isValid = false
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

function handleReturn() {
	let isSubmitted = false

	$('#returnBtn').on('click', async function () {
		if (isSubmitted) return
		isSubmitted = true

		const loanId = $(this).data('loanId')
		const formattedLoanId = $(this).data('formattedLoanId')

		toggleButtonLoading($(this), true)

		try {
			const response = await fetch(
				`./api/loans/${encodeURIComponent(loanId)}/return`,
				{
					method: 'PATCH',
					headers: {
						Accept: 'application/json',
					},
				},
			)

			const json = await response.json()

			if (response.ok && json.success) {
				const table = $('#table').DataTable()
				const row = table
					.rows()
					.nodes()
					.to$()
					.filter(function () {
						return (
							$(this).find('td').eq(0).text().trim() ===
							formattedLoanId.toString()
						)
					})

				if (row.length > 0) {
					row
						.find('td:eq(6)')
						.html(
							'<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Devuelto</span>',
						)
					row
						.find('td:eq(7)')
						.find('.btn[aria-label="Devolver el préstamo"]')
						.remove()
					row.find('button[data-status]').data('status', 'devuelto')
					table.row(row).invalidate().draw(false)
				}

				loadOptions()

				$('#returnModal').modal('hide')
				showToast('Préstamo devuelto exitosamente.', 'success')
			} else {
				console.error(
					`Backend error (${json.errorType} - ${json.statusCode}):`,
					json.message,
				)
				$('#returnModal').modal('hide')
				showToast('Hubo un error al devolver el préstamo.', 'error')
			}
		} catch (error) {
			console.error('Unexpected error:', error)
			showToast('Hubo un error inesperado.', 'error')
			$('#returnModal').modal('hide')
		} finally {
			toggleButtonLoading($(this), true)
		}
	})
}

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
				const field = $(this)
				if (field.attr('id') !== 'editQuantity') {
					if (!validateEditField(field)) isValid = false
				}
			})

		if (!isValid) {
			$(this).data('submitted', false)
			return
		}

		const loanId = $('#editForm').data('loanId')
		const bookId = $('#editForm').data('bookId')

		const formData = new FormData(form)
		const raw = Object.fromEntries(formData.entries())

		const loan = {
			loanId: parseInt(loanId),
			bookId: parseInt(bookId),
			studentId: parseInt(raw.student),
			returnDate: raw.returnDate,
			observation: raw.observation || '',
		}

		const submitButton = $('#updateBtn')
		toggleButtonLoading(submitButton, true)

		try {
			const response = await fetch('./api/loans', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(loan),
			})

			const json = await response.json()

			if (response.ok && json.success) {
				updateRow(json.data)
				$('#editModal').modal('hide')
				showToast('Préstamo actualizado exitosamente.', 'success')
			} else {
				console.error(
					`Backend error (${json.errorType} - ${json.statusCode}):`,
					json.message,
				)
				showToast(
					json.message || 'Hubo un error al actualizar el préstamo.',
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
	if (field.attr('type') === 'search') {
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

	// Return date validation
	if (field.is('#editReturnDate') && $('#editLoanDate').val()) {
		const result = isValidReturnDate($('#editLoanDate').val(), field.val())
		if (!result.valid) {
			field.addClass('is-invalid')
			errorMessage = result.message
			field.siblings('.invalid-feedback').html(errorMessage)
			isValid = false
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
		populateSelect('#addBook', bookList, 'bookId', 'title')
		$('#addBook').selectpicker()

		populateSelect('#addStudent', studentList, 'studentId', 'fullName')
		$('#addStudent').selectpicker()

		$('#addForm')[0].reset()
		$('#addForm .is-invalid').removeClass('is-invalid')

		const today = getCurrentPeruDate()
		const peruDateStr = today.toISOString().split('T')[0]

		$('#addLoanDate').val(peruDateStr)

		const baseDate = new Date(peruDateStr + 'T00:00:00')

		const minReturnDate = new Date(baseDate)
		minReturnDate.setDate(minReturnDate.getDate() + 1)

		const maxReturnDate = new Date(baseDate)
		maxReturnDate.setDate(maxReturnDate.getDate() + 14)

		const minDateStr = minReturnDate.toISOString().split('T')[0]
		const maxDateStr = maxReturnDate.toISOString().split('T')[0]

		$('#addReturnDate').attr('min', minDateStr)
		$('#addReturnDate').attr('max', maxDateStr)

		placeholderColorDateInput()
	})

	// Details Modal
	$(document).on('click', '[data-bs-target="#detailsModal"]', function () {
		const loanId = $(this).data('id')
		$('#detailsModalID').text($(this).data('formatted-id'))

		toggleModalLoading(this, true)

		fetch(`./api/loans/${encodeURIComponent(loanId)}`, {
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
				$('#detailsID').text(data.formattedLoanId)

				$('#detailsBook').html(`
				${data.bookTitle}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${data.formattedBookId}</span>
			`)

				$('#detailsStudent').html(`
				${data.studentFullName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${data.formattedStudentId}</span>
			`)

				$('#detailsLoanDate').text(moment(data.loanDate).format('DD MMM YYYY'))
				$('#detailsReturnDate').text(
					moment(data.returnDate).format('DD MMM YYYY'),
				)
				$('#detailsQuantity').text(data.quantity)

				$('#detailsStatus').html(
					data.status === 'prestado'
						? '<span class="badge text-warning-emphasis bg-warning-subtle border border-warning-subtle">Prestado</span>'
						: '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Devuelto</span>',
				)

				$('#detailsLoanObservation').text(data.observation)

				toggleModalLoading(this, false)
			})
			.catch((error) => {
				console.error(
					`Error loading loan details (${error.errorType || 'unknown'} - ${error.status}):`,
					error.message || error,
				)
				showToast('Hubo un error al cargar los detalles del préstamo.', 'error')
				$('#detailsModal').modal('hide')
			})
	})

	// Return Loan Modal
	$('#returnModal').on('show.bs.modal', function (event) {
		const button = $(event.relatedTarget)
		const loanId = button.data('id')
		const formattedLoanId = button.data('formatted-id')

		const currentStatus = button.data('status')

		$('#returnModalID').text(formattedLoanId)

		if (currentStatus !== 'prestado') {
			$('#returnModal').modal('hide')
			showToast('Este préstamo ya ha sido devuelto.', 'error')
			return
		}

		$('#returnBtn').data('loanId', loanId)
		$('#returnBtn').data('formattedLoanId', formattedLoanId)
	})

	// Edit Modal
	$(document).on('click', '[data-bs-target="#editModal"]', function () {
		const loanId = $(this).data('id')
		$('#editModalID').text($(this).data('formatted-id'))

		toggleModalLoading(this, true)

		fetch(`./api/loans/${encodeURIComponent(loanId)}`, {
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
				$('#editForm').data('loanId', data.loanId)
				$('#editForm').data('bookId', data.bookId)

				$('#editBook').html(`
				${data.bookTitle}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${data.formattedBookId}</span>
			`)

				populateSelect('#editStudent', studentList, 'studentId', 'fullName')
				$('#editStudent').val(data.studentId)
				$('#editStudent').selectpicker()

				$('#editLoanDate').val(moment(data.loanDate).format('YYYY-MM-DD'))
				$('#editReturnDate').val(moment(data.returnDate).format('YYYY-MM-DD'))
				$('#editQuantity').val(data.quantity)
				$('#editObservation').val(data.observation)

				$('#editForm .is-invalid').removeClass('is-invalid')

				const loanDate = new Date(data.loanDate)
				const minReturnDate = new Date(loanDate)
				minReturnDate.setDate(loanDate.getDate() + 1)

				const maxReturnDate = new Date(loanDate)
				maxReturnDate.setDate(loanDate.getDate() + 14)

				const minDateStr = minReturnDate.toISOString().split('T')[0]
				const maxDateStr = maxReturnDate.toISOString().split('T')[0]

				$('#editReturnDate').attr('min', minDateStr)
				$('#editReturnDate').attr('max', maxDateStr)

				placeholderColorEditSelect()
				placeholderColorDateInput()

				$('#editForm')
					.find('select')
					.each(function () {
						validateEditField($(this), true)
					})

				toggleModalLoading(this, false)
			})
			.catch((error) => {
				console.error(
					`Error loading loan details for editing (${error.errorType || 'unknown'} - ${error.status}):`,
					error.message || error,
				)
				showToast('Hubo un error al cargar los datos del préstamo.', 'error')
				$('#editModal').modal('hide')
			})
	})
}

function formatStrings(str) {
	const parts = str?.split(/\s+|\n/).filter(Boolean) || []
	return parts.length > 1
		? parts.slice(0, -1).join(' ') + ' - ' + parts.at(-1)
		: parts[0] || ''
}

function generateLoanReceipt(response) {
	let hasWarnings = false

	try {
		const { jsPDF } = window.jspdf
		const doc = new jsPDF('p', 'mm', [150, 200])
		const pageWidth = doc.internal.pageSize.getWidth()
		const margin = 10
		const topMargin = 5

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

		const logoUrl = '/images/bookstudio-logo-no-bg.png'

		try {
			doc.addImage(logoUrl, 'PNG', margin, topMargin - 5, 30, 30)
		} catch (imgError) {
			console.warn('Logo not available:', imgError)
			showToast('No se pudo cargar el logo. Se continuará sin él.', 'warning')
			hasWarnings = true
		}

		doc.setFont('helvetica', 'bold')
		doc.setFontSize(14)
		doc.text('Recibo de préstamo', pageWidth / 2, topMargin + 13, {
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

		const loanDetails = [
			['Código', response.formattedLoanId],
			['Libro - Código', response.bookTitle + ' - ' + response.formattedBookId],
			[
				'Estudiante - Código',
				response.studentFullName + ' - ' + response.formattedStudentId,
			],
			['Fecha préstamo', moment(response.loanDate).format('DD MMM YYYY')],
			['Fecha devolución', moment(response.returnDate).format('DD MMM YYYY')],
			['Cantidad', response.quantity],
		]

		if (response.observation) {
			loanDetails.push(['Observación', response.observation])
		}

		doc.autoTable({
			startY: topMargin + 25,
			margin: { left: margin, right: margin },
			head: [['Detalle', 'Información']],
			body: loanDetails,
			theme: 'grid',
			headStyles: {
				fillColor: [0, 0, 0],
				textColor: 255,
				fontStyle: 'bold',
				fontSize: 10,
				halign: 'left',
			},
			bodyStyles: {
				font: 'helvetica',
				fontSize: 9,
				halign: 'left',
			},
			columnStyles: {
				0: { fontStyle: 'bold', cellWidth: 50 },
			},
		})

		const finalY = doc.previousAutoTable.finalY + 10
		doc.setFontSize(8)
		doc.setFont('helvetica', 'italic')
		doc.text(
			'Este documento es un comprobante del préstamo realizado. Por favor consérvelo hasta la devolución.',
			pageWidth / 2,
			finalY,
			{ align: 'center' },
		)

		const filename = `Recibo_de_préstamo_bookstudio_${fecha.replace(/\s+/g, '_')}.pdf`
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
		console.error('Error al generar el PDF:', error)
		showToast(
			'Ocurrió un error al generar el PDF. Inténtalo nuevamente.',
			'error',
		)
	}
}

function generatePDF(dataTable) {
	const pdfBtn = $('#generatePDF')
	toggleButtonLoading(pdfBtn, true)

	let hasWarnings = false

	try {
		const { jsPDF } = window.jspdf
		const doc = new jsPDF('l', 'mm', 'a4')
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
		doc.text('Lista de préstamos', pageWidth / 2, topMargin + 13, {
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
				let estado = row.cells[6].innerText.trim()
				estado = estado.includes('Devuelto') ? 'Devuelto' : 'Prestado'

				return [
					row.cells[0].innerText.trim(),
					formatStrings(row.cells[1].innerText.trim()),
					formatStrings(row.cells[2].innerText.trim()),
					row.cells[3].innerText.trim(),
					row.cells[4].innerText.trim(),
					row.cells[5].innerText.trim(),
					estado,
				]
			})

		doc.autoTable({
			startY: topMargin + 25,
			margin: { left: margin, right: margin },
			head: [
				[
					'Código',
					'Libro - Código',
					'Estudiante - Código',
					'Fecha préstamo',
					'Fecha devolución',
					'Cantidad',
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
				if (data.section === 'body' && data.column.index === 6) {
					data.cell.styles.textColor =
						data.cell.raw === 'Devuelto' ? [0, 128, 0] : [255, 0, 0]
				}
			},
		})

		const filename = `Lista_de_préstamos_bookstudio_${fecha.replace(/\s+/g, '_')}.pdf`

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
		const worksheet = workbook.addWorksheet('Préstamos')

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

		worksheet.mergeCells('A1:G1')
		const titleCell = worksheet.getCell('A1')
		titleCell.value = 'Lista de préstamos - BookStudio'
		titleCell.font = { name: 'Arial', size: 14, bold: true }
		titleCell.alignment = { horizontal: 'center' }

		worksheet.mergeCells('A2:G2')
		const dateTimeCell = worksheet.getCell('A2')
		dateTimeCell.value = `Fecha: ${dateStr}  Hora: ${timeStr}`
		dateTimeCell.alignment = { horizontal: 'center' }

		worksheet.columns = [
			{ key: 'id', width: 10 },
			{ key: 'libro', width: 50 },
			{ key: 'estudiante', width: 50 },
			{ key: 'fecha_prestamo', width: 20 },
			{ key: 'fecha_devolucion', width: 20 },
			{ key: 'cantidad', width: 10 },
			{ key: 'estado', width: 15 },
		]

		const headerRow = worksheet.getRow(4)
		headerRow.values = [
			'Código',
			'Libro - Código',
			'Estudiante - Código',
			'Fecha préstamo',
			'Fecha devolución',
			'Cantidad',
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
				let estado = row.cells[6].innerText.trim()
				estado = estado.includes('Devuelto') ? 'Devuelto' : 'Prestado'

				return {
					id: row.cells[0].innerText.trim(),
					libro: formatStrings(row.cells[1].innerText.trim()),
					estudiante: formatStrings(row.cells[2].innerText.trim()),
					fecha_prestamo: row.cells[3].innerText.trim(),
					fecha_devolucion: row.cells[4].innerText.trim(),
					cantidad: row.cells[5].innerText.trim(),
					estado: estado,
				}
			})

		data.forEach((item) => {
			const row = worksheet.addRow(item)
			const estadoCell = row.getCell(7)
			if (estadoCell.value === 'Devuelto') {
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

		const filename = `Lista_de_préstamos_bookstudio_${dateStr.replace(/\s+/g, '_')}.xlsx`

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
	handleReturn()
	handleEditForm()
	loadModalData()
	loadOptions()
	$('.selectpicker').selectpicker()
	setupBootstrapSelectDropdownStyles()
	placeholderColorSelect()
})
