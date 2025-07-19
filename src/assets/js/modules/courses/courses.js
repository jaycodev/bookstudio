/**
 * courses.js
 *
 * Handles the initialization and behavior of the courses table,
 * including loading data, configuring modals for creating, viewing,
 * editing, and logically deleting course records.
 *
 * Uses the Fetch API to communicate with RESTful endpoints for all course-related
 * CRUD operations. Manages UI components such as placeholders, enhanced dropdowns,
 * validation feedback, loading states, and tooltips.
 *
 * Also includes features for generating PDF reports and exporting table data to Excel.
 *
 * @author Jason
 */

import { loadTableData, addRowToTable, updateRowInTable } from '@utils/tables'

import { isValidText } from '@utils/forms'

import {
  showToast,
  toggleButtonLoading,
  toggleModalLoading,
  placeholderColorSelect,
  placeholderColorEditSelect,
  setupBootstrapSelectDropdownStyles,
} from '@utils/ui'

/** ***************************************
 * TABLE HANDLING
 *****************************************/

function generateRow(course) {
  const userRole = sessionStorage.getItem('userRole')

  return `
		<tr>
			<td class="align-middle text-start">
				<span class="badge bg-body-tertiary text-body-emphasis border">${course.formattedCourseId}</span>
			</td>
			<td class="align-middle text-start">${course.name}</td>
			<td class="align-middle text-start">
			  ${
          course.level === 'Básico'
            ? '<span class="badge text-primary-emphasis bg-primary-subtle border border-primary-subtle">Básico</span>'
            : course.level === 'Intermedio'
              ? '<span class="badge text-warning-emphasis bg-warning-subtle border border-warning-subtle">Intermedio</span>'
              : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Avanzado</span>'
        }
			</td>
			<td class="align-middle text-start">${course.description}</td>
			<td class="align-middle text-center">
				${
          course.status === 'activo'
            ? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
            : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>'
        }
			</td>
			<td class="align-middle text-center">
				<div class="d-inline-flex gap-2">
					<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Detalles"
						data-bs-toggle="modal" data-bs-target="#detailsModal" data-id="${course.courseId}" data-formatted-id="${course.formattedCourseId}">
						<i class="bi bi-info-circle"></i>
					</button>
					${
            userRole === 'administrador'
              ? `<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Editar"
							data-bs-toggle="modal" data-bs-target="#editModal" data-id="${course.courseId}" data-formatted-id="${course.formattedCourseId}">
							<i class="bi bi-pencil"></i>
						</button>`
              : ''
          }
				</div>
			</td>
		</tr>
	`
}

function addRow(course) {
  addRowToTable(course, generateRow)
}

function loadData() {
  loadTableData({
    resource: 'courses',
    generateRow,
    generatePDF,
    generateExcel,
  })
}

function updateRow(course) {
  updateRowInTable({
    entity: course,
    getFormattedId: (c) => c.formattedCourseId?.toString(),
    updateCellsFn: (row, c) => {
      row.find('td').eq(1).text(c.name)

      const levelBadge =
        {
          Básico:
            '<span class="badge text-primary-emphasis bg-primary-subtle border border-primary-subtle">Básico</span>',
          Intermedio:
            '<span class="badge text-warning-emphasis bg-warning-subtle border border-warning-subtle">Intermedio</span>',
          Avanzado:
            '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Avanzado</span>',
        }[c.level] || `<span class="badge bg-secondary">${c.level}</span>`

      row.find('td').eq(2).html(levelBadge)
      row.find('td').eq(3).text(c.description)

      row
        .find('td')
        .eq(4)
        .html(
          c.status === 'activo'
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

    const course = {
      name: raw.name,
      level: raw.level,
      description: raw.description,
      status: raw.status,
    }

    const submitButton = $('#addBtn')
    toggleButtonLoading(submitButton, true)

    try {
      const response = await fetch('./api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(course),
      })

      const json = await response.json()

      if (response.ok && json.success) {
        addRow(json.data)
        $('#addModal').modal('hide')
        showToast('Curso agregado exitosamente.', 'success')
      } else {
        console.error(`Backend error (${json.errorType} - ${json.statusCode}):`, json.message)
        $('#addModal').modal('hide')
        showToast('Hubo un error al agregar el curso.', 'error')
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

  // Name validation
  if (field.is('#addName')) {
    const result = isValidText(field.val(), 'nombre')
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

    const courseId = $('#editForm').data('courseId')

    const formData = new FormData(form)
    const raw = Object.fromEntries(formData.entries())

    const course = {
      courseId: parseInt(courseId),
      name: raw.name,
      level: raw.level,
      description: raw.description,
      status: raw.status,
    }

    const submitButton = $('#updateBtn')
    toggleButtonLoading(submitButton, true)

    try {
      const response = await fetch('./api/courses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(course),
      })

      const json = await response.json()

      if (response.ok && json.success) {
        updateRow(json.data)
        $('#editModal').modal('hide')
        showToast('Curso actualizado exitosamente.', 'success')
      } else {
        console.error(`Backend error (${json.errorType} - ${json.statusCode}):`, json.message)
        showToast(json.message || 'Hubo un error al actualizar el curso.', 'error')
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

  // Name validation
  if (field.is('#editName')) {
    const result = isValidText(field.val(), 'nombre')
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
    $('#addLevel')
      .selectpicker('destroy')
      .empty()
      .append(
        $('<option>', {
          value: 'Básico',
          text: 'Básico',
        }),
        $('<option>', {
          value: 'Intermedio',
          text: 'Intermedio',
        }),
        $('<option>', {
          value: 'Avanzado',
          text: 'Avanzado',
        }),
      )
    $('#addLevel').selectpicker()

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
  })

  // Details Modal
  $(document).on('click', '[data-bs-target="#detailsModal"]', async function () {
    const courseId = $(this).data('id')
    $('#detailsModalID').text($(this).data('formatted-id'))

    toggleModalLoading(this, true)

    try {
      const response = await fetch(`./api/courses/${encodeURIComponent(courseId)}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw { status: response.status, ...errorData }
      }

      const data = await response.json()

      $('#detailsID').text(data.formattedCourseId)
      $('#detailsName').text(data.name)

      $('#detailsLevel').html(
        data.level === 'Básico'
          ? '<span class="badge text-primary-emphasis bg-primary-subtle border border-primary-subtle">Básico</span>'
          : data.level === 'Intermedio'
            ? '<span class="badge text-warning-emphasis bg-warning-subtle border border-warning-subtle">Intermedio</span>'
            : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Avanzado</span>',
      )

      $('#detailsStatus').html(
        data.status === 'activo'
          ? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
          : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>',
      )

      $('#detailsDescription').text(data.description)

      toggleModalLoading(this, false)
    } catch (error) {
      console.error(
        `Error loading course details (${error.errorType || 'unknown'} - ${error.status}):`,
        error.message || error,
      )
      showToast('Hubo un error al cargar los detalles del curso.', 'error')
      $('#detailsModal').modal('hide')
    }
  })

  // Edit Modal
  $(document).on('click', '[data-bs-target="#editModal"]', async function () {
    const courseId = $(this).data('id')
    $('#editModalID').text($(this).data('formatted-id'))

    toggleModalLoading(this, true)

    try {
      const response = await fetch(`./api/courses/${encodeURIComponent(courseId)}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw { status: response.status, ...errorData }
      }

      const data = await response.json()

      $('#editForm').data('courseId', data.courseId)
      $('#editName').val(data.name)
      $('#editDescription').val(data.description)

      $('#editLevel')
        .selectpicker('destroy')
        .empty()
        .append(
          $('<option>', { value: 'Básico', text: 'Básico' }),
          $('<option>', { value: 'Intermedio', text: 'Intermedio' }),
          $('<option>', { value: 'Avanzado', text: 'Avanzado' }),
        )
      $('#editLevel').val(data.level).selectpicker()

      $('#editStatus')
        .selectpicker('destroy')
        .empty()
        .append(
          $('<option>', { value: 'activo', text: 'Activo' }),
          $('<option>', { value: 'inactivo', text: 'Inactivo' }),
        )
      $('#editStatus').val(data.status).selectpicker()

      $('#editForm .is-invalid').removeClass('is-invalid')

      placeholderColorEditSelect()

      $('#editForm')
        .find('select')
        .each(function () {
          validateEditField($(this), true)
        })

      toggleModalLoading(this, false)
    } catch (error) {
      console.error(
        `Error loading course details for editing (${error.errorType || 'unknown'} - ${error.status}):`,
        error.message || error,
      )
      showToast('Hubo un error al cargar los datos del curso.', 'error')
      $('#editModal').modal('hide')
    }
  })
}

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
    const margin = 15
    const topMargin = 5

    try {
      doc.addImage(logoUrl, 'PNG', margin, topMargin, 30, 30)
    } catch (imgError) {
      console.warn('Logo not available:', imgError)
      showToast('No se pudo cargar el logo. Se continuará sin él.', 'warning')
      hasWarnings = true
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.setTextColor(40)
    doc.text('Lista de cursos', pageWidth / 2, topMargin + 18, {
      align: 'center',
    })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Fecha: ${fecha}`, pageWidth - margin, topMargin + 15, {
      align: 'right',
    })
    doc.text(`Hora: ${hora}`, pageWidth - margin, topMargin + 20, {
      align: 'right',
    })

    const data = dataTable
      .rows({ search: 'applied' })
      .nodes()
      .toArray()
      .map((row) => {
        let estado = row.cells[4].innerText.trim()
        estado = estado.includes('Activo') ? 'Activo' : 'Inactivo'

        return [
          row.cells[0].innerText.trim(),
          row.cells[1].innerText.trim(),
          row.cells[2].innerText.trim(),
          row.cells[3].innerText.trim(),
          estado,
        ]
      })

    doc.autoTable({
      startY: topMargin + 35,
      margin: { left: margin, right: margin },
      head: [['Código', 'Nombre', 'Nivel', 'Descripción', 'Estado']],
      body: data,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'left',
      },
      bodyStyles: {
        font: 'helvetica',
        fontSize: 10,
        halign: 'left',
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 50 },
        2: { cellWidth: 30 },
        3: { cellWidth: 50 },
        4: { cellWidth: 30 },
      },
      didParseCell: function (data) {
        if (data.section === 'body' && data.column.index === 4) {
          data.cell.styles.textColor = data.cell.raw === 'Activo' ? [0, 128, 0] : [255, 0, 0]
        }
      },
    })

    const filename = `Lista_de_cursos_bookstudio_${fecha.replace(/\s+/g, '_')}.pdf`

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
    const worksheet = workbook.addWorksheet('Cursos')

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

    worksheet.mergeCells('A1:E1')
    const titleCell = worksheet.getCell('A1')
    titleCell.value = 'Lista de cursos - BookStudio'
    titleCell.font = { name: 'Arial', size: 14, bold: true }
    titleCell.alignment = { horizontal: 'center' }

    worksheet.mergeCells('A2:E2')
    const dateTimeCell = worksheet.getCell('A2')
    dateTimeCell.value = `Fecha: ${dateStr}  Hora: ${timeStr}`
    dateTimeCell.alignment = { horizontal: 'center' }

    worksheet.columns = [
      { key: 'id', width: 10 },
      { key: 'nombre', width: 40 },
      { key: 'nivel', width: 20 },
      { key: 'descripcion', width: 50 },
      { key: 'estado', width: 15 },
    ]

    const headerRow = worksheet.getRow(4)
    headerRow.values = ['Código', 'Nombre', 'Nivel', 'Descripción', 'Estado']
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
        let estado = row.cells[4].innerText.trim()
        estado = estado.includes('Activo') ? 'Activo' : 'Inactivo'

        return {
          id: row.cells[0].innerText.trim(),
          nombre: row.cells[1].innerText.trim(),
          nivel: row.cells[2].innerText.trim(),
          descripcion: row.cells[3].innerText.trim(),
          estado: estado,
        }
      })

    data.forEach((item) => {
      const row = worksheet.addRow(item)
      const estadoCell = row.getCell(5)
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

    const filename = `Lista_de_cursos_bookstudio_${dateStr.replace(/\s+/g, '_')}.xlsx`

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
  $('.selectpicker').selectpicker()
  setupBootstrapSelectDropdownStyles()
  placeholderColorSelect()
})
