/**
 * books.js
 *
 * Handles the initialization and behavior of the books table,
 * including loading data, configuring modals for creating, viewing,
 * editing, and logically deleting book records.
 *
 * Uses the Fetch API to communicate with RESTful endpoints for all book-related
 * CRUD operations. Manages UI components such as placeholders, enhanced dropdowns,
 * validation feedback, loading states, and tooltips.
 *
 * Also includes features for generating PDF reports and exporting table data to Excel.
 *
 * @author Jason
 */

import { loadTableData, addRowToTable, updateRowInTable } from '@utils/tables'

import {
  isValidText,
  isValidTotalCopies,
  isValidTotalCopiesInRange,
  isValidReleaseDate,
  loadSelectOptions,
  populateSelect,
} from '@utils/forms'

import {
  showToast,
  toggleButtonLoading,
  toggleModalLoading,
  placeholderColorSelect,
  placeholderColorEditSelect,
  placeholderColorDateInput,
  setupBootstrapSelectDropdownStyles,
  getCurrentPeruDate,
} from '@utils/ui'

/** ***************************************
 * GLOBAL VARIABLES AND HELPER FUNCTIONS
 *****************************************/

// Global list of authors, publishers, courses, and genres for the selectpickers
let authorList = []
let publisherList = []
let courseList = []
let genreList = []

function loadOptions() {
  loadSelectOptions({
    resource: 'books',
    onSuccess: (data) => {
      authorList = data.authors
      publisherList = data.publishers
      courseList = data.courses
      genreList = data.genres
    },
  })
}

/** ***************************************
 * TABLE HANDLING
 *****************************************/

function generateRow(book) {
  const userRole = sessionStorage.getItem('userRole')

  return `
		<tr>
			<td class="align-middle text-start">
				<span class="badge bg-body-tertiary text-body-emphasis border">${book.formattedBookId}</span>
			</td>
			<td class="align-middle text-start">${book.title}</td>
			<td class="align-middle text-center">
				<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">${book.availableCopies}</span>
			</td>
			<td class="align-middle text-center">
				<span class="badge text-warning-emphasis bg-warning-subtle border border-warning-subtle">${book.loanedCopies}</span>
			</td>
			<td class="align-middle text-start">
				${book.authorName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${book.formattedAuthorId}</span>
			</td>
			<td class="align-middle text-start">
				${book.publisherName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${book.formattedPublisherId}</span>
			</td>
			<td class="align-middle text-center">
				${
          book.status === 'activo'
            ? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
            : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>'
        }
			</td>
			<td class="align-middle text-center">
				<div class="d-inline-flex gap-2">
					<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Detalles"
						data-bs-toggle="modal" data-bs-target="#detailsModal" data-id="${book.bookId}" data-formatted-id="${book.formattedBookId}">
						<i class="bi bi-info-circle"></i>
					</button>
					${
            userRole === 'administrador'
              ? `<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Editar"
							data-bs-toggle="modal" data-bs-target="#editModal" data-id="${book.bookId}" data-formatted-id="${book.formattedBookId}">
							<i class="bi bi-pencil"></i>
						</button>`
              : ''
          }
				</div>
			</td>
		</tr>
	`
}

function addRow(book) {
  addRowToTable(book, generateRow)
}

function loadData() {
  loadTableData({
    resource: 'books',
    generateRow,
    generatePDF,
    generateExcel,
  })
}

function updateRow(book) {
  updateRowInTable({
    entity: book,
    getFormattedId: (b) => b.formattedBookId?.toString(),
    updateCellsFn: (row, b) => {
      row.find('td').eq(1).text(b.title)

      row.find('td').eq(2).html(`
				<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">
					${b.availableCopies}
				</span>
			`)

      row.find('td').eq(3).html(`
				<span class="badge text-warning-emphasis bg-warning-subtle border border-warning-subtle">
					${b.loanedCopies}
				</span>
			`)

      row.find('td').eq(4).html(`
				${b.authorName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${b.formattedAuthorId}</span>
			`)

      row.find('td').eq(5).html(`
				${b.publisherName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${b.formattedPublisherId}</span>
			`)

      row
        .find('td')
        .eq(6)
        .html(
          b.status === 'activo'
            ? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
            : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>',
        )
    },
  })
}

/** ***************************************
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

    const book = {
      title: raw.title,
      totalCopies: parseInt(raw.totalCopies),
      authorId: parseInt(raw.author),
      publisherId: parseInt(raw.publisher),
      courseId: parseInt(raw.course),
      releaseDate: raw.releaseDate,
      genreId: parseInt(raw.genre),
      status: raw.status,
    }

    const submitButton = $('#addBtn')
    toggleButtonLoading(submitButton, true)

    try {
      const response = await fetch('./api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(book),
      })

      const json = await response.json()

      if (response.ok && json.success) {
        addRow(json.data)
        $('#addModal').modal('hide')
        showToast('Libro agregado exitosamente.', 'success')
      } else {
        console.error(`Backend error (${json.errorType} - ${json.statusCode}):`, json.message)
        $('#addModal').modal('hide')
        showToast('Hubo un error al agregar el libro.', 'error')
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

  // Title validation
  if (field.is('#addTitle')) {
    const result = isValidText(field.val(), 'título')
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Total copies validation
  if (field.is('#addTotalCopies')) {
    const result = isValidTotalCopies(parseInt(field.val(), 10))
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Release date validation
  if (field.is('#addReleaseDate')) {
    const result = isValidReleaseDate(field.val())
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
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

    const bookId = $('#editForm').data('bookId')

    const formData = new FormData(form)
    const raw = Object.fromEntries(formData.entries())

    const book = {
      bookId: parseInt(bookId),
      title: raw.title,
      totalCopies: parseInt(raw.totalCopies),
      authorId: parseInt(raw.author),
      publisherId: parseInt(raw.publisher),
      courseId: parseInt(raw.course),
      releaseDate: raw.releaseDate,
      genreId: parseInt(raw.genre),
      status: raw.status,
    }

    const submitButton = $('#updateBtn')
    toggleButtonLoading(submitButton, true)

    try {
      const response = await fetch('./api/books', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(book),
      })

      const json = await response.json()

      if (response.ok && json.success) {
        updateRow(json.data)
        $('#editModal').modal('hide')
        showToast('Libro actualizado exitosamente.', 'success')
      } else {
        console.error(`Backend error (${json.errorType} - ${json.statusCode}):`, json.message)
        showToast(json.message || 'Hubo un error al actualizar el libro.', 'error')
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

  // Title validation
  if (field.is('#editTitle')) {
    const result = isValidText(field.val(), 'título')
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Total copies validation
  if (field.is('#editTotalCopies')) {
    const copies = parseInt(field.val(), 10)
    const minCopies = parseInt(field.attr('min'), 10)
    const result = isValidTotalCopiesInRange(copies, minCopies, 1000)
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Release date validation
  if (field.is('#editReleaseDate')) {
    const result = isValidReleaseDate(field.val())
    if (!result.valid) {
      isValid = false
      errorMessage = result.message
    }
  }

  // Select validation
  if (field.is('select')) {
    const container = field.closest('.bootstrap-select')
    container.toggleClass('is-invalid', field.hasClass('is-invalid'))
    container.siblings('.invalid-feedback').html('Opción seleccionada inactiva o no existente.')
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

/** ***************************************
 * MODAL MANAGEMENT
 *****************************************/

function loadModalData() {
  // Add Modal
  $(document).on('click', '[data-bs-target="#addModal"]', function () {
    populateSelect('#addAuthor', authorList, 'authorId', 'name')
    $('#addAuthor').selectpicker()

    populateSelect('#addPublisher', publisherList, 'publisherId', 'name')
    $('#addPublisher').selectpicker()

    populateSelect('#addCourse', courseList, 'courseId', 'name')
    $('#addCourse').selectpicker()

    const today = getCurrentPeruDate()
    const peruDateStr = today.toISOString().split('T')[0]
    $('#addReleaseDate').attr('max', peruDateStr)

    populateSelect('#addGenre', genreList, 'genreId', 'name')
    $('#addGenre').selectpicker()

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

    $('#addForm')[0].reset()
    $('#addForm .is-invalid').removeClass('is-invalid')

    placeholderColorDateInput()
  })

  // Details Modal
  $(document).on('click', '[data-bs-target="#detailsModal"]', function () {
    const bookId = $(this).data('id')
    $('#detailsModalID').text($(this).data('formatted-id'))

    toggleModalLoading(this, true)

    fetch(`./api/books/${encodeURIComponent(bookId)}`, {
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
        $('#detailsID').text(data.formattedBookId)
        $('#detailsTitle').text(data.title)
        $('#detailsAvaibleCopies').text(data.availableCopies)
        $('#detailsLoanedCopies').text(data.loanedCopies)

        $('#detailsAuthor').html(`
				${data.authorName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${data.formattedAuthorId}</span>
			`)
        $('#detailsPublisher').html(`
				${data.publisherName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${data.formattedPublisherId}</span>
			`)
        $('#detailsCourse').html(`
				${data.courseName}
				<span class="badge bg-body-tertiary text-body-emphasis border ms-1">${data.formattedCourseId}</span>
			`)

        $('#detailsReleaseDate').text(moment(data.releaseDate).format('DD MMM YYYY'))
        $('#detailsGenre').text(data.genreName)
        $('#detailsStatus').html(
          data.status === 'activo'
            ? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
            : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>',
        )

        toggleModalLoading(this, false)
      })
      .catch((error) => {
        console.error(
          `Error loading book details (${error.errorType || 'unknown'} - ${error.status}):`,
          error.message || error,
        )
        showToast('Hubo un error al cargar los detalles del libro.', 'error')
        $('#detailsModal').modal('hide')
      })
  })

  // Edit Modal
  $(document).on('click', '[data-bs-target="#editModal"]', function () {
    const bookId = $(this).data('id')
    $('#editModalID').text($(this).data('formatted-id'))

    toggleModalLoading(this, true)

    fetch(`./api/books/${encodeURIComponent(bookId)}`, {
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
        $('#editForm').data('bookId', data.bookId)
        $('#editTitle').val(data.title)
        $('#editTotalCopies').val(data.totalCopies)
        $('#editTotalCopies').attr('min', Math.max(1, data.loanedCopies))

        populateSelect('#editAuthor', authorList, 'authorId', 'name')
        $('#editAuthor').val(data.authorId)
        $('#editAuthor').selectpicker()

        populateSelect('#editPublisher', publisherList, 'publisherId', 'name')
        $('#editPublisher').val(data.publisherId)
        $('#editPublisher').selectpicker()

        populateSelect('#editCourse', courseList, 'courseId', 'name')
        $('#editCourse').val(data.courseId)
        $('#editCourse').selectpicker()

        populateSelect('#editGenre', genreList, 'genreId', 'name')
        $('#editGenre').val(data.genreId)
        $('#editGenre').selectpicker()

        $('#editReleaseDate').val(moment(data.releaseDate).format('YYYY-MM-DD'))

        const today = getCurrentPeruDate()
        const peruDateStr = today.toISOString().split('T')[0]
        $('#editReleaseDate').attr('max', peruDateStr)

        $('#editStatus')
          .selectpicker('destroy')
          .empty()
          .append(
            $('<option>', { value: 'activo', text: 'Activo' }),
            $('<option>', { value: 'inactivo', text: 'Inactivo' }),
          )
        $('#editStatus').val(data.status)
        $('#editStatus').selectpicker()

        $('#editForm .is-invalid').removeClass('is-invalid')
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
          `Error loading book details for editing (${error.errorType || 'unknown'} - ${error.status}):`,
          error.message || error,
        )
        showToast('Hubo un error al cargar los datos del libro.', 'error')
        $('#editModal').modal('hide')
      })
  })
}

function formatStrings(str) {
  const parts = str?.split(/\s+|\n/).filter(Boolean) || []
  return parts.length > 1 ? parts.slice(0, -1).join(' ') + ' - ' + parts.at(-1) : parts[0] || ''
}

function applyTextColorByColumnPDF(data) {
  const col = data.column.index
  const value = data.cell.raw

  const colorMap = {
    2: [0, 128, 0],
    3: [255, 193, 7],
    6: value === 'Activo' ? [0, 128, 0] : [255, 0, 0],
  }

  if (colorMap.hasOwnProperty(col)) {
    data.cell.styles.textColor = colorMap[col]
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
    doc.text('Lista de libros', pageWidth / 2, topMargin + 13, {
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
        estado = estado.includes('Activo') ? 'Activo' : 'Inactivo'

        return [
          row.cells[0].innerText.trim(),
          row.cells[1].innerText.trim(),
          row.cells[2].innerText.trim(),
          row.cells[3].innerText.trim(),
          formatStrings(row.cells[4].innerText.trim()),
          formatStrings(row.cells[5].innerText.trim()),
          estado,
        ]
      })

    doc.autoTable({
      startY: topMargin + 25,
      margin: { left: margin, right: margin },
      head: [
        [
          'Código',
          'Título',
          'Ej. disp.',
          'Ej. prest.',
          'Autor - Código',
          'Editorial - Código',
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
        if (data.section === 'body') {
          applyTextColorByColumnPDF(data)
        }
      },
    })

    const filename = `Lista_de_libros_bookstudio_${fecha.replace(/\s+/g, '_')}.pdf`

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
    showToast('Ocurrió un error al generar el PDF. Inténtalo nuevamente.', 'error')
  } finally {
    toggleButtonLoading(pdfBtn, false)
  }
}

function generateExcel(dataTable) {
  const excelBtn = $('#generateExcel')
  toggleButtonLoading(excelBtn, true)

  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Libros')

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
    titleCell.value = 'Lista de libros - BookStudio'
    titleCell.font = { name: 'Arial', size: 14, bold: true }
    titleCell.alignment = { horizontal: 'center' }

    worksheet.mergeCells('A2:G2')
    const dateTimeCell = worksheet.getCell('A2')
    dateTimeCell.value = `Fecha: ${dateStr}  Hora: ${timeStr}`
    dateTimeCell.alignment = { horizontal: 'center' }

    worksheet.columns = [
      { key: 'id', width: 10 },
      { key: 'titulo', width: 40 },
      { key: 'disponibles', width: 10 },
      { key: 'prestados', width: 10 },
      { key: 'autor', width: 50 },
      { key: 'editorial', width: 50 },
      { key: 'estado', width: 15 },
    ]

    const headerRow = worksheet.getRow(4)
    headerRow.values = [
      'Código',
      'Título',
      'Ej. disp.',
      'Ej. prest.',
      'Autor - Código',
      'Editorial - Código',
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
        estado = estado.includes('Activo') ? 'Activo' : 'Inactivo'

        return {
          id: row.cells[0].innerText.trim(),
          titulo: row.cells[1].innerText.trim(),
          disponibles: row.cells[2].innerText.trim(),
          prestados: row.cells[3].innerText.trim(),
          autor: formatStrings(row.cells[4].innerText.trim()),
          editorial: formatStrings(row.cells[5].innerText.trim()),
          estado: estado,
        }
      })

    function applyCellStyle(cell, colorHex, backgroundHex) {
      cell.font = { color: { argb: colorHex } }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: backgroundHex },
      }
    }

    data.forEach((item) => {
      const row = worksheet.addRow(item)

      const estadoCell = row.getCell(7)
      if (estadoCell.value === 'Activo') {
        applyCellStyle(estadoCell, '008000', 'E6F2E6')
      } else {
        applyCellStyle(estadoCell, 'FF0000', 'FFE6E6')
      }

      const disponiblesCell = row.getCell(3)
      applyCellStyle(disponiblesCell, '008000', 'E6F2E6')

      const prestadosCell = row.getCell(4)
      applyCellStyle(prestadosCell, 'FFFFC107', 'FFFFF8E1')
    })

    const filename = `Lista_de_libros_bookstudio_${dateStr.replace(/\s+/g, '_')}.xlsx`

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

/** ***************************************
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
