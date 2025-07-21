/**
 * students.js
 *
 * Handles the initialization and behavior of the students table,
 * including loading data, configuring modals for creating, viewing,
 * editing, and logically deleting student records.
 *
 * Uses the Fetch API to communicate with RESTful endpoints for all student-related
 * CRUD operations. Manages UI components such as placeholders, enhanced dropdowns,
 * validation feedback, loading states, and tooltips.
 *
 * Also includes features for generating PDF reports and exporting table data to Excel.
 *
 * @author Jason
 */

const PUBLIC_API_URL = window.APP_CONFIG?.PUBLIC_API_URL || 'http://localhost:8080'

import { loadTableData, addRowToTable, updateRowInTable } from '/js/shared/utils/tables/index.js'

import {
  genericAddForm,
  genericEditForm,
  loadSelectOptions,
  populateSelect,
} from '/js/shared/utils/forms/index.js'

import { validateAddField, validateEditField } from './validations.js'

import {
  showToast,
  toggleButtonLoading,
  toggleModalLoading,
  placeholderColorSelect,
  placeholderColorEditSelect,
  placeholderColorDateInput,
  setupBootstrapSelectDropdownStyles,
  getCurrentPeruDate,
} from '/js/shared/utils/ui/index.js'

/** ***************************************
 * GLOBAL VARIABLES AND HELPER FUNCTIONS
 *****************************************/

// Global list of faculties for the selectpickers
let facultyList = []

function loadOptions() {
  loadSelectOptions({
    resource: 'students',
    onSuccess: (data) => {
      facultyList = data.faculties
    },
  })
}

/** ***************************************
 * TABLE HANDLING
 *****************************************/

function generateRow(student) {
  return `
		<tr>
			<td class="align-middle text-start">
				<span class="badge bg-body-tertiary text-body-emphasis border">${student.formattedStudentId}</span>
			</td>
			<td class="align-middle text-start">
				<span class="badge bg-body-secondary text-body-emphasis border">${student.dni}</span>
			</td>
			<td class="align-middle text-start">${student.firstName}</td>
			<td class="align-middle text-start">${student.lastName}</td>
			<td class="align-middle text-start">
				<span class="badge bg-body-secondary text-body-emphasis border">${student.phone}</span>
			</td>
			<td class="align-middle text-start">${student.email}</td>
			<td class="align-middle text-center">
				${
          student.status === 'activo'
            ? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
            : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>'
        }
			</td>
			<td class="align-middle text-center">
				<div class="d-inline-flex gap-2">
					<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Detalles"
						data-bs-toggle="modal" data-bs-target="#detailsModal" data-id="${student.studentId}" data-formatted-id="${student.formattedStudentId}">
						<i class="bi bi-info-circle"></i>
					</button>
					<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Editar"
						data-bs-toggle="modal" data-bs-target="#editModal" data-id="${student.studentId}" data-formatted-id="${student.formattedStudentId}">
						<i class="bi bi-pencil"></i>
					</button>
				</div>
			</td>
		</tr>
	`
}

function addRow(student) {
  addRowToTable(student, generateRow)
}

function loadData() {
  loadTableData({
    resource: 'students',
    generateRow,
    generatePDF,
    generateExcel,
  })
}

function updateRow(student) {
  updateRowInTable({
    entity: student,
    getFormattedId: (s) => s.formattedStudentId?.toString(),
    updateCellsFn: (row, s) => {
      const cells = row.querySelectorAll('td')

      cells[2].textContent = s.firstName
      cells[3].textContent = s.lastName

      const phoneSpan = cells[4].querySelector('span')
      if (phoneSpan) phoneSpan.textContent = s.phone

      cells[5].textContent = s.email

      cells[6].innerHTML =
        s.status === 'activo'
          ? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
          : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>'
    },
  })
}

/** ***************************************
 * FORM LOGIC
 *****************************************/

function handleAddForm() {
  genericAddForm({
    resource: 'students',
    validateFieldFn: validateAddField,
    addRowFn: addRow,
    useCustomFieldError: true,
    buildPayloadFn: async (formData) => {
      const raw = Object.fromEntries(formData.entries())
      return {
        dni: raw.DNI,
        firstName: raw.firstName,
        lastName: raw.lastName,
        address: raw.address,
        phone: raw.phone,
        email: raw.email,
        birthDate: raw.birthDate,
        gender: raw.gender,
        facultyId: parseInt(raw.faculty),
        status: raw.status,
      }
    },
  })
}

function handleEditForm() {
  genericEditForm({
    resource: 'students',
    validateFieldFn: validateEditField,
    updateRowFn: updateRow,
    useCustomFieldError: true,
    buildPayloadFn: async (formData) => {
      const raw = Object.fromEntries(formData.entries())
      const studentId = parseInt(document.getElementById('editForm').dataset.studentId)

      return {
        studentId: parseInt(studentId),
        firstName: raw.firstName,
        lastName: raw.lastName,
        address: raw.address,
        phone: raw.phone,
        email: raw.email,
        birthDate: raw.birthDate,
        gender: raw.gender,
        facultyId: parseInt(raw.faculty),
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
  $(document).on('click', '[data-bs-target="#addModal"]', function () {
    $('#addGender')
      .selectpicker('destroy')
      .empty()
      .append(
        $('<option>', {
          value: 'Masculino',
          text: 'Masculino',
        }),
        $('<option>', {
          value: 'Femenino',
          text: 'Femenino',
        }),
      )
    $('#addGender').selectpicker()

    populateSelect('#addFaculty', facultyList, 'facultyId', 'name')
    $('#addFaculty').selectpicker()

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

    const todayPeru = getCurrentPeruDate()
    const maxDateStr = todayPeru.toISOString().split('T')[0]
    $('#addBirthDate').attr('max', maxDateStr)

    placeholderColorDateInput()

    handleAddForm()
  })

  // Details Modal
  $(document).on('click', '[data-bs-target="#detailsModal"]', function () {
    const studentId = $(this).data('id')
    $('#detailsModalID').text($(this).data('formatted-id'))

    toggleModalLoading(this, true)

    fetch(`${PUBLIC_API_URL}/api/students/${encodeURIComponent(studentId)}`, {
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
        $('#detailsID').text(data.formattedStudentId)
        $('#detailsDNI').text(data.dni)
        $('#detailsFirstName').text(data.firstName)
        $('#detailsLastName').text(data.lastName)
        $('#detailsAddress').text(data.address)
        $('#detailsPhone').text(data.phone)
        $('#detailsEmail').text(data.email)
        $('#detailsBirthDate').text(moment(data.birthDate).format('DD MMM YYYY'))
        $('#detailsGender').text(data.gender)
        $('#detailsFaculty').text(data.facultyName)

        $('#detailsStatus').html(
          data.status === 'activo'
            ? '<span class="badge text-success-emphasis bg-success-subtle border border-success-subtle">Activo</span>'
            : '<span class="badge text-danger-emphasis bg-danger-subtle border border-danger-subtle">Inactivo</span>',
        )

        toggleModalLoading(this, false)
      })
      .catch((error) => {
        console.error(
          `Error loading student details (${error.errorType || 'unknown'} - ${error.status}):`,
          error.message || error,
        )
        showToast('Hubo un error al cargar los detalles del estudiante.', 'error')
        const detailsModalEl = document.getElementById('detailsModal')
        const detailsModal =
          bootstrap.Modal.getInstance(detailsModalEl) || new bootstrap.Modal(detailsModalEl)
        detailsModal.hide()
      })
  })

  // Edit Modal
  $(document).on('click', '[data-bs-target="#editModal"]', function () {
    const studentId = $(this).data('id')
    $('#editModalID').text($(this).data('formatted-id'))

    toggleModalLoading(this, true)

    fetch(`${PUBLIC_API_URL}/api/students/${encodeURIComponent(studentId)}`, {
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
        document.getElementById('editForm').setAttribute('data-student-id', data.studentId)
        $('#editDNI').val(data.dni)
        $('#editFirstName').val(data.firstName)
        $('#editLastName').val(data.lastName)
        $('#editAddress').val(data.address)
        $('#editPhone').val(data.phone)
        $('#editEmail').val(data.email)
        $('#editBirthDate').val(moment(data.birthDate).format('YYYY-MM-DD'))

        const todayPeru = getCurrentPeruDate()
        const maxDateStr = todayPeru.toISOString().split('T')[0]
        $('#editBirthDate').attr('max', maxDateStr)

        $('#editGender')
          .selectpicker('destroy')
          .empty()
          .append(
            $('<option>', { value: 'Masculino', text: 'Masculino' }),
            $('<option>', { value: 'Femenino', text: 'Femenino' }),
          )
        $('#editGender').val(data.gender)
        $('#editGender').selectpicker()

        populateSelect('#editFaculty', facultyList, 'facultyId', 'name')
        $('#editFaculty').val(data.facultyId)
        $('#editFaculty').selectpicker()

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

        handleEditForm()
      })
      .catch((error) => {
        console.error(
          `Error loading student details for editing (${error.errorType || 'unknown'} - ${error.status}):`,
          error.message || error,
        )
        showToast('Hubo un error al cargar los datos del estudiante.', 'error')
        const editModalEl = document.getElementById('editModal')
        const editModal =
          bootstrap.Modal.getInstance(editModalEl) || new bootstrap.Modal(editModalEl)
        editModal.hide()
      })
  })
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
    doc.text('Lista de estudiantes', pageWidth / 2, topMargin + 13, {
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
          row.cells[4].innerText.trim(),
          row.cells[5].innerText.trim(),
          estado,
        ]
      })

    doc.autoTable({
      startY: topMargin + 25,
      margin: { left: margin, right: margin },
      head: [['Código', 'DNI', 'Nombres', 'Apellidos', 'Teléfono', 'Correo electrónico', 'Estado']],
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
          data.cell.styles.textColor = data.cell.raw === 'Activo' ? [0, 128, 0] : [255, 0, 0]
        }
      },
    })

    const filename = `Lista_de_estudiantes_bookstudio_${fecha.replace(/\s+/g, '_')}.pdf`

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
    const worksheet = workbook.addWorksheet('Estudiantes')

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
    titleCell.value = 'Lista de estudiantes - BookStudio'
    titleCell.font = { name: 'Arial', size: 14, bold: true }
    titleCell.alignment = { horizontal: 'center' }

    worksheet.mergeCells('A2:G2')
    const dateTimeCell = worksheet.getCell('A2')
    dateTimeCell.value = `Fecha: ${dateStr}  Hora: ${timeStr}`
    dateTimeCell.alignment = { horizontal: 'center' }

    worksheet.columns = [
      { key: 'id', width: 10 },
      { key: 'dni', width: 15 },
      { key: 'nombres', width: 30 },
      { key: 'apellidos', width: 30 },
      { key: 'telefono', width: 20 },
      { key: 'correo', width: 30 },
      { key: 'estado', width: 15 },
    ]

    const headerRow = worksheet.getRow(4)
    headerRow.values = [
      'Código',
      'DNI',
      'Nombres',
      'Apellidos',
      'Teléfono',
      'Correo electrónico',
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
          dni: row.cells[1].innerText.trim(),
          nombres: row.cells[2].innerText.trim(),
          apellidos: row.cells[3].innerText.trim(),
          telefono: row.cells[4].innerText.trim(),
          correo: row.cells[5].innerText.trim(),
          estado: estado,
        }
      })

    data.forEach((item) => {
      const row = worksheet.addRow(item)
      const estadoCell = row.getCell(7)
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

    const filename = `Lista_de_estudiantes_bookstudio_${dateStr.replace(/\s+/g, '_')}.xlsx`

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
