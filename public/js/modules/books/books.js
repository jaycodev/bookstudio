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

import { loadTableData, addRowToTable, updateRowInTable } from '/js/shared/utils/tables/index.js'

import {
  genericAddForm,
  genericEditForm,
  loadSelectOptions,
  populateSelect,
} from '/js/shared/utils/forms/index.js'

import { validateAddField, validateEditField } from './validations.js'

import {
  initAddModal,
  initDetailsModal,
  initEditModal,
  showToast,
  toggleButtonLoading,
  placeholderColorSelect,
  placeholderColorEditSelect,
  placeholderColorDateInput,
  setupBootstrapSelectDropdownStyles,
  getCurrentPeruDate,
  generateBadge,
} from '/js/shared/utils/ui/index.js'

/** ***************************************
 * GLOBAL VARIABLES AND HELPER FUNCTIONS
 *****************************************/

// Global list of authors, publishers, courses, and genres for the selectpickers
let authorList = []
let publisherList = []
let courseList = []
let genreList = []

// Global variable used to store detail data and reuse it in the edit modal
let currentDetailData = null

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
  return `
		<tr data-id="${book.bookId}" data-formatted-id="${book.formattedBookId}">
			<td class="align-middle text-start">
        ${generateBadge(book.formattedBookId, 'secondary')}
			</td>
			<td class="align-middle text-start">${book.title}</td>
			<td class="align-middle text-center">
        ${generateBadge(book.availableCopies, 'success')}
			</td>
			<td class="align-middle text-center">
        ${generateBadge(book.loanedCopies, 'warning')}
			</td>
			<td class="align-middle text-start">
        <i class="bi bi-person me-1"></i>
				${book.authorName}
        ${generateBadge(book.formattedAuthorId, 'secondary')}
			</td>
			<td class="align-middle text-start">
        <i class="bi bi-map me-1"></i>
				${book.publisherName}
        ${generateBadge(book.formattedPublisherId, 'secondary')}
			</td>
			<td class="align-middle text-center">
				${
          book.status === 'activo'
            ? generateBadge('Activo', 'success', 'bi-check-circle')
            : generateBadge('Inactivo', 'danger', 'bi-x-circle')
        }
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
      const cells = row.querySelectorAll('td')

      cells[1].textContent = b.title
      cells[2].innerHTML = `
        ${generateBadge(b.availableCopies, 'success')}
      `
      cells[3].innerHTML = `
        ${generateBadge(b.loanedCopies, 'warning')}
      `
      cells[4].innerHTML = `
        <i class="bi bi-person me-1"></i>
        ${b.authorName}
        ${generateBadge(b.formattedAuthorId, 'secondary')}
      `
      cells[5].innerHTML = `
        <i class="bi bi-map me-1"></i>
        ${b.publisherName}
        ${generateBadge(b.formattedPublisherId, 'secondary')}
      `
      cells[6].innerHTML =
        b.status === 'activo'
          ? generateBadge('Activo', 'success', 'bi-check-circle')
          : generateBadge('Inactivo', 'danger', 'bi-x-circle')
    },
  })
}

/** ***************************************
 * FORM LOGIC
 *****************************************/

function handleAddForm() {
  genericAddForm({
    resource: 'books',
    validateFieldFn: validateAddField,
    addRowFn: addRow,
    buildPayloadFn: async (formData) => {
      const raw = Object.fromEntries(formData.entries())
      return {
        title: raw.title,
        totalCopies: parseInt(raw.totalCopies),
        authorId: parseInt(raw.author),
        publisherId: parseInt(raw.publisher),
        courseId: parseInt(raw.course),
        releaseDate: raw.releaseDate,
        genreId: parseInt(raw.genre),
        status: raw.status,
      }
    },
  })
}

function handleEditForm() {
  genericEditForm({
    resource: 'books',
    validateFieldFn: validateEditField,
    updateRowFn: updateRow,
    buildPayloadFn: async (formData) => {
      const raw = Object.fromEntries(formData.entries())
      const bookId = parseInt(document.getElementById('editForm').dataset.bookId)

      return {
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
    },
  })
}

/** ***************************************
 * MODAL MANAGEMENT
 *****************************************/

function loadModalData() {
  // Add Modal
  initAddModal({
    onOpen: () => {
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
          }).attr('data-content', generateBadge('Activo', 'success', 'bi-check-circle')),
          $('<option>', {
            value: 'inactivo',
          }).attr('data-content', generateBadge('Inactivo', 'danger', 'bi-x-circle')),
        )
      $('#addStatus').selectpicker()

      $('#addForm')[0].reset()
      $('#addForm .is-invalid').removeClass('is-invalid')

      placeholderColorDateInput()

      handleAddForm()
    },
  })

  // Details Modal
  initDetailsModal({
    resource: 'books',
    onSuccess: (data) => {
      currentDetailData = data

      $('#detailsID').text(data.formattedBookId)
      $('#detailsTitle').text(data.title)
      $('#detailsAvaibleCopies').text(data.availableCopies)
      $('#detailsLoanedCopies').text(data.loanedCopies)

      $('#detailsAuthor').html(`
				${data.authorName}
        ${generateBadge(data.formattedAuthorId, 'secondary')}
			`)
      $('#detailsPublisher').html(`
				${data.publisherName}
        ${generateBadge(data.formattedPublisherId, 'secondary')}
			`)
      $('#detailsCourse').html(`
				${data.courseName}
        ${generateBadge(data.formattedCourseId, 'secondary')}
			`)

      $('#detailsReleaseDate').text(moment(data.releaseDate).format('DD MMM YYYY'))
      $('#detailsGenre').text(data.genreName)
      $('#detailsStatus').html(
        data.status === 'activo'
          ? generateBadge('Activo', 'success', 'bi-check-circle')
          : generateBadge('Inactivo', 'danger', 'bi-x-circle'),
      )
    },
  })

  // Edit Modal
  initEditModal({
    getData: () => currentDetailData,
    onOpen: (data) => {
      $('#editModalID').text(data.formattedBookId)

      document.getElementById('editForm').setAttribute('data-book-id', data.bookId)
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
          $('<option>', {
            value: 'activo',
          }).attr('data-content', generateBadge('Activo', 'success', 'bi-check-circle')),
          $('<option>', {
            value: 'inactivo',
          }).attr('data-content', generateBadge('Inactivo', 'danger', 'bi-x-circle')),
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

      handleEditForm()
    },
  })

  const detailsOffcanvasEl = document.getElementById('detailsOffcanvas')
  detailsOffcanvasEl?.addEventListener('hidden.bs.offcanvas', () => {
    document.body.classList.remove('details-open')
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
  const pdfBtn = document.getElementById('generatePDF')
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
  const excelBtn = document.getElementById('generateExcel')
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
  loadModalData()
  loadOptions()
  $('.selectpicker').selectpicker()
  setupBootstrapSelectDropdownStyles()
  placeholderColorSelect()
})
