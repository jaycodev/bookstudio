/**
 * users.js
 *
 * Handles the initialization and behavior of the users table,
 * including loading data, configuring modals for creating, viewing,
 * editing, and deleting user records.
 *
 * Uses the Fetch API to communicate with RESTful endpoints for all user-related
 * CRUD operations. Manages UI components such as placeholders, enhanced dropdowns,
 * validation feedback, loading states, image cropping, and tooltips.
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
  validateImageFileUI,
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
  initializeCropper,
  setupBootstrapSelectDropdownStyles,
  togglePasswordVisibility,
  generateBadge,
} from '/js/shared/utils/ui/index.js'

/** ***************************************
 * GLOBAL VARIABLES AND HELPER FUNCTIONS
 *****************************************/

// Global variable to handle profile photo deletion in edit modal
let deletePhotoFlag = false

// Global variable used to store detail data and reuse it in the edit modal
let currentDetailData = null

/** ***************************************
 * TABLE HANDLING
 *****************************************/

function generateRow(user) {
  return `
		<tr data-id="${user.userId}" data-formatted-id="${user.formattedUserId}">
			<td class="align-middle text-start">
        ${generateBadge(user.formattedUserId, 'secondary')}
			</td>
			<td class="align-middle text-start">${user.username}</td>
      <td class="align-middle text-start">
        <a href="mailto:${user.email}" target="_blank" rel="noopener">
          ${user.email}
        </a>
      </td>
			<td class="align-middle text-start">${user.firstName}</td>
			<td class="align-middle text-start">${user.lastName}</td>
			<td class="align-middle text-start">
        ${
          user.role === 'administrador'
            ? generateBadge('Administrador', 'default', 'bi-shield-lock')
            : generateBadge('Bibliotecario', 'default', 'bi-person-workspace')
        }
			</td>
			<td class="align-middle text-center">
				${
          user.profilePhotoUrl
            ? `<img src="${user.profilePhotoUrl}" alt="Foto del Usuario" class="img-fluid rounded-circle" style="width: 20px; height: 20px;">`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi-person-circle" viewBox="0 0 16 16">
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
						<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
					</svg>`
        }
			</td>
			<td class="align-middle text-center">
				<div class="d-inline-flex gap-2">
					<button class="btn btn-sm btn-icon-hover" data-tooltip="tooltip" data-bs-placement="top" title="Eliminar"
						data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="${user.userId}" data-formatted-id="${user.formattedUserId}">
						<i class="bi bi-trash"></i>
					</button>
				</div>
			</td>
		</tr>
	`
}

function addRow(user) {
  addRowToTable(user, generateRow)
}

function loadData() {
  loadTableData({
    resource: 'users',
    generateRow,
    generatePDF,
    generateExcel,
  })
}

function updateRow(user) {
  updateRowInTable({
    entity: user,
    getFormattedId: (u) => u.formattedUserId?.toString(),
    updateCellsFn: (row, u) => {
      const cells = row.querySelectorAll('td')

      cells[3].textContent = u.firstName
      cells[4].textContent = u.lastName

      cells[5].innerHTML =
        u.role === 'administrador'
          ? generateBadge('Administrador', 'default', 'bi-shield-lock')
          : generateBadge('Bibliotecario', 'default', 'bi-person-workspace')

      const avatarHtml = u.profilePhotoUrl?.trim()
        ? `<img src="${u.profilePhotoUrl}" alt="Foto del Usuario" class="img-fluid rounded-circle" style="width: 20px; height: 20px;">`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi-person-circle" viewBox="0 0 16 16">
             <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
             <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
           </svg>`

      cells[6].innerHTML = avatarHtml
    },
  })
}

/** ***************************************
 * FORM LOGIC
 *****************************************/

function handleAddForm() {
  genericAddForm({
    resource: 'users',
    validateFieldFn: validateAddField,
    addRowFn: addRow,
    useCropper: true,
    useCustomFieldError: true,
    buildPayloadFn: async (formData) => {
      const raw = Object.fromEntries(formData.entries())
      return {
        username: raw.username,
        email: raw.email,
        firstName: raw.firstName,
        lastName: raw.lastName,
        password: raw.password,
        role: raw.role,
        profilePhotoUrl: null, // 🔜 Preparado para Cloudinary
      }
    },
  })
}

document.querySelectorAll('#addProfilePhoto, #editProfilePhoto').forEach((input) => {
  input.addEventListener('change', function () {
    validateImageFileUI(this)
  })
})

function handleEditForm() {
  genericEditForm({
    resource: 'users',
    validateFieldFn: validateEditField,
    updateRowFn: updateRow,
    useCropper: true,
    useCustomFieldError: true,
    buildPayloadFn: async (formData) => {
      const raw = Object.fromEntries(formData.entries())
      const userId = parseInt(document.getElementById('editForm').dataset.userId)

      return {
        userId: parseInt(userId),
        firstName: raw.firstName,
        lastName: raw.lastName,
        role: raw.role,
        deletePhoto: deletePhotoFlag || false,
        profilePhotoUrl: null, // 🔜 Preparado para Cloudinary
      }
    },
  })
}

function handleDelete() {
  let isSubmitted = false

  const deleteBtn = document.getElementById('deleteBtn')
  if (!deleteBtn) return

  deleteBtn.addEventListener('click', async function () {
    if (isSubmitted) return
    isSubmitted = true

    const userId = this.dataset.userId
    const formattedUserId = this.dataset.formattedUserId

    toggleButtonLoading(this, true)

    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/users/${encodeURIComponent(userId)}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      })

      const json = await response.json()

      if (response.ok && json.success) {
        const table = $('#table').DataTable()
        const rows = table.rows().nodes().toArray()

        const matchingRow = rows.find((rowEl) => {
          const firstCellText = rowEl.querySelector('td')?.textContent.trim()
          return firstCellText === formattedUserId.toString()
        })

        if (matchingRow) {
          table.row(matchingRow).remove().draw(false)
        }

        const modal = document.getElementById('deleteModal')
        if (modal) bootstrap.Modal.getInstance(modal)?.hide()

        showToast('Usuario eliminado exitosamente.', 'success')
      } else {
        console.error(`Backend error (${json.errorType} - ${json.statusCode}):`, json.message)

        const modal = document.getElementById('deleteModal')
        if (modal) bootstrap.Modal.getInstance(modal)?.hide()

        showToast(json.message || 'Hubo un error al eliminar el usuario.', 'error')
      }
    } catch (err) {
      console.error('Unexpected error:', err)

      const modal = document.getElementById('deleteModal')
      if (modal) bootstrap.Modal.getInstance(modal)?.hide()

      showToast('Hubo un error inesperado.', 'error')
    } finally {
      toggleButtonLoading(this, false)
    }
  })
}

/** ***************************************
 * MODAL MANAGEMENT
 *****************************************/

function loadModalData() {
  // Add Modal
  initAddModal({
    onOpen: () => {
      $('#addRole')
        .selectpicker('destroy')
        .empty()
        .append(
          $('<option>', {
            value: 'administrador',
          }).attr('data-content', generateBadge('Administrador', 'default', 'bi-shield-lock')),
          $('<option>', {
            value: 'bibliotecario',
          }).attr('data-content', generateBadge('Bibliotecario', 'default', 'bi-person-workspace')),
        )
      $('#addRole').selectpicker()

      $('#defaultAddPhotoContainer').removeClass('d-none')
      $('#deleteAddPhotoBtn').addClass('d-none')

      $('#addForm')[0].reset()
      $('#addForm .is-invalid').removeClass('is-invalid')

      $('#cropperContainerAdd').addClass('d-none')

      if (cropper) {
        cropper.destroy()
        cropper = null
      }

      $('#addForm .password-field').attr('type', 'password')
      $('#addForm .input-group-text').find('i').removeClass('bi-eye-slash').addClass('bi-eye')

      preventSpacesInPasswordField('#addPassword, #addConfirmPassword')

      handleAddForm()
    },
  })

  // Details Modal
  initDetailsModal({
    resource: 'users',
    onSuccess: (data) => {
      currentDetailData = data

      $('#detailsID').text(data.formattedUserId)
      $('#detailsUsername').text(data.username)
      $('#detailsEmail').html(`
          <a href="mailto:${data.email}" target="_blank" rel="noopener">
            ${data.email}
          </a>
        `)
      $('#detailsFirstName').text(data.firstName)
      $('#detailsLastName').text(data.lastName)

      $('#detailsRole').html(
        data.role === 'administrador'
          ? '<i class="bi bi-shield-lock me-1"></i> Administrador'
          : '<i class="bi bi-person-workspace me-1"></i> Bibliotecario',
      )

      if (data.profilePhotoUrl) {
        $('#detailsImg').attr('src', data.profilePhotoUrl).removeClass('d-none')
        $('#detailsSvg').addClass('d-none')
      } else {
        $('#detailsImg').addClass('d-none')
        $('#detailsSvg').removeClass('d-none')
      }
    },
  })

  // Edit Modal
  initEditModal({
    getData: () => currentDetailData,
    onOpen: (data) => {
      $('#editModalID').text(data.formattedUserId)

      document.getElementById('editForm').setAttribute('data-user-id', data.userId)
      $('#editUsername').val(data.username)
      $('#editEmail').val(data.email)
      $('#editFirstName').val(data.firstName)
      $('#editLastName').val(data.lastName)

      $('#editRole')
        .selectpicker('destroy')
        .empty()
        .append(
          $('<option>', {
            value: 'administrador',
          }).attr('data-content', generateBadge('Administrador', 'default', 'bi-shield-lock')),
          $('<option>', {
            value: 'bibliotecario',
          }).attr('data-content', generateBadge('Bibliotecario', 'default', 'bi-person-workspace')),
        )
      $('#editRole').val(data.role)
      $('#editRole').selectpicker()

      updateEditImageContainer(data.profilePhotoUrl)

      $('#editForm .is-invalid').removeClass('is-invalid')
      placeholderColorEditSelect()

      $('#editForm')
        .find('select')
        .each(function () {
          validateEditField($(this), true)
        })

      $('#editProfilePhoto').val('')

      $('#cropperContainerEdit').addClass('d-none')
      if (cropper) {
        cropper.destroy()
        cropper = null
      }

      handleEditForm()
    },
  })

  const detailsOffcanvasEl = document.getElementById('detailsOffcanvas')
  detailsOffcanvasEl?.addEventListener('hidden.bs.offcanvas', () => {
    document.body.classList.remove('details-open')
  })

  const deleteModal = document.getElementById('deleteModal')

  if (deleteModal) {
    deleteModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget
      if (!button) return

      const userId = button.getAttribute('data-id')
      const formattedUserId = button.getAttribute('data-formatted-id')

      const deleteModalID = document.getElementById('deleteModalID')
      if (deleteModalID) {
        deleteModalID.textContent = formattedUserId
      }

      const deleteBtn = document.getElementById('deleteBtn')
      if (deleteBtn) {
        deleteBtn.setAttribute('data-user-id', userId)
        deleteBtn.setAttribute('data-formatted-user-id', formattedUserId)
      }

      handleDelete()
    })
  }
}

function preventSpacesInPasswordField(selector) {
  $(selector)
    .off('input')
    .on('input', function () {
      const inputElement = this
      const cursorPosition = inputElement.selectionStart
      const originalValue = $(this).val()
      const newValue = originalValue.replace(/\s/g, '')

      if (originalValue !== newValue) {
        $(this).val(newValue)
        const spacesRemoved = (originalValue.slice(0, cursorPosition).match(/\s/g) || []).length
        inputElement.setSelectionRange(
          cursorPosition - spacesRemoved,
          cursorPosition - spacesRemoved,
        )
      }
    })
}

function updateEditImageContainer(profilePhotoUrl) {
  const $editImageContainer = $('#currentEditPhotoContainer')
  const $deleteEditPhotoBtn = $('#deleteEditPhotoBtn')

  $editImageContainer.empty()

  if (profilePhotoUrl) {
    $editImageContainer.html(
      `<img src="${profilePhotoUrl}" class="img-fluid rounded-circle" alt="Foto del Usuario">`,
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
  $('#addProfilePhoto').val('')
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
  $('#editProfilePhoto').val('')
})

let cropper
const $cropperContainerAdd = $('#cropperContainerAdd')
const $imageToCropAdd = $('#imageToCropAdd')
const $cropperContainerEdit = $('#cropperContainerEdit')
const $imageToCropEdit = $('#imageToCropEdit')

$('#addProfilePhoto, #editProfilePhoto').on('change', function () {
  const file = this.files[0]
  deletePhotoFlag = false

  $('#deleteAddPhotoBtn').addClass('d-none')
  $('#deleteEditPhotoBtn').addClass('d-none')

  if (file && ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
    $('#defaultAddPhotoContainer').addClass('d-none')
    $('#currentEditPhotoContainer').addClass('d-none')

    $('#deleteAddPhotoBtn').removeClass('d-none')
    $('#deleteEditPhotoBtn').removeClass('d-none')

    let $container, $image
    if ($(this).is('#addProfilePhoto')) {
      $container = $cropperContainerAdd
      $image = $imageToCropAdd
    } else {
      $container = $cropperContainerEdit
      $image = $imageToCropEdit
    }
    initializeCropper(file, $container, $image, cropper)
  } else {
    if ($(this).is('#addProfilePhoto')) {
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
    doc.text('Lista de usuarios', pageWidth / 2, topMargin + 13, {
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
        return [
          row.cells[0].innerText.trim(),
          row.cells[1].innerText.trim(),
          row.cells[2].innerText.trim(),
          row.cells[3].innerText.trim(),
          row.cells[4].innerText.trim(),
          row.cells[5].innerText.trim(),
        ]
      })

    doc.autoTable({
      startY: topMargin + 25,
      margin: { left: margin, right: margin },
      head: [['Código', 'Nombre de usuario', 'Correo electrónico', 'Nombres', 'Apellidos', 'Rol']],
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
          data.cell.styles.textColor = [0, 0, 0]
        }
      },
    })

    const filename = `Lista_de_usuarios_bookstudio_${fecha.replace(/\s+/g, '_')}.pdf`

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
    const worksheet = workbook.addWorksheet('Usuarios')

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
    titleCell.value = 'Lista de usuarios - BookStudio'
    titleCell.font = { name: 'Arial', size: 14, bold: true }
    titleCell.alignment = { horizontal: 'center' }

    worksheet.mergeCells('A2:F2')
    const dateTimeCell = worksheet.getCell('A2')
    dateTimeCell.value = `Fecha: ${dateStr}  Hora: ${timeStr}`
    dateTimeCell.alignment = { horizontal: 'center' }

    worksheet.columns = [
      { key: 'id', width: 10 },
      { key: 'usuario', width: 20 },
      { key: 'correo', width: 30 },
      { key: 'nombres', width: 30 },
      { key: 'apellidos', width: 30 },
      { key: 'rol', width: 20 },
    ]

    const headerRow = worksheet.getRow(4)
    headerRow.values = [
      'Código',
      'Nombre de usuario',
      'Correo electrónico',
      'Nombres',
      'Apellidos',
      'Rol',
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
        return {
          id: row.cells[0].innerText.trim(),
          usuario: row.cells[1].innerText.trim(),
          correo: row.cells[2].innerText.trim(),
          nombres: row.cells[3].innerText.trim(),
          apellidos: row.cells[4].innerText.trim(),
          rol: row.cells[5].innerText.trim(),
        }
      })

    data.forEach((item) => worksheet.addRow(item))

    const filename = `Lista_de_usuarios_bookstudio_${dateStr.replace(/\s+/g, '_')}.xlsx`

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
  $('.selectpicker').selectpicker()
  setupBootstrapSelectDropdownStyles()
  placeholderColorSelect()
  togglePasswordVisibility()
})
