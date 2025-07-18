export function placeholderColorSelect() {
  $('select.selectpicker').on('change', function () {
    const $select = $(this)
    const $dropdown = $select.closest('.bootstrap-select')
    const $filterOption = $dropdown.find('.filter-option-inner-inner')

    if ($select.val() !== '' && $select.val() !== null) {
      $dropdown.removeClass('placeholder-color')
      $filterOption.css('color', 'var(--bs-body-color)')
    }
  })
}

export function placeholderColorEditSelect() {
  $('select[id^="edit"]').each(function () {
    const $select = $(this)
    const $dropdown = $select.closest('.bootstrap-select')
    const $filterOption = $dropdown.find('.filter-option-inner-inner')

    if ($filterOption.text().trim() === 'No hay selección') {
      $filterOption.css('color', 'var(--placeholder-color)')
    } else {
      $filterOption.css('color', 'var(--bs-body-color)')
    }
  })
}

function updateDropdownIcons($dropdown) {
  $dropdown.find('.dropdown-item').each(function () {
    const $item = $(this)
    const $icon = $item.find('i.bi-check2')

    if ($item.hasClass('active') && $item.hasClass('selected')) {
      if ($icon.length === 0) {
        $('<i class="bi bi-check2 ms-auto"></i>').appendTo($item)
      }
    } else {
      $icon.remove()
    }
  })
}

export function setupBootstrapSelectDropdownStyles() {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.classList.contains('dropdown-menu')) {
          const $dropdown = $(node)
          $dropdown.addClass('gap-1 px-2 rounded-3 mx-0 shadow')
          $dropdown
            .find('.dropdown-item')
            .addClass('rounded-2 d-flex align-items-center justify-content-between')

          $dropdown.find('li:not(:first-child)').addClass('mt-1')

          updateDropdownIcons($dropdown)
        }
      })
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })

  $(document).on('click', '.bootstrap-select .dropdown-item', function () {
    const $dropdown = $(this).closest('.dropdown-menu')
    updateDropdownIcons($dropdown)
  })
}
