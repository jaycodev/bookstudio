export function placeholderColorSelect() {
  document.querySelectorAll('select.selectpicker').forEach((select) => {
    select.addEventListener('change', () => {
      const dropdown = select.closest('.bootstrap-select')
      const filterOption = dropdown?.querySelector('.filter-option-inner-inner')

      if (select.value !== '' && select.value !== null) {
        dropdown?.classList.remove('placeholder-color')
        if (filterOption) filterOption.style.color = 'var(--bs-body-color)'
      }
    })
  })
}

export function placeholderColorEditSelect() {
  document.querySelectorAll('select[id^="edit"]').forEach((select) => {
    const dropdown = select.closest('.bootstrap-select')
    const filterOption = dropdown?.querySelector('.filter-option-inner-inner')

    if (filterOption) {
      if (filterOption.textContent.trim() === 'No hay selección') {
        filterOption.style.color = 'var(--placeholder-color)'
      } else {
        filterOption.style.color = 'var(--bs-body-color)'
      }
    }
  })
}

function updateDropdownIcons(dropdown) {
  dropdown.querySelectorAll('.dropdown-item').forEach((item) => {
    const icon = item.querySelector('i.bi-check2')

    if (item.classList.contains('active') && item.classList.contains('selected')) {
      if (!icon) {
        const newIcon = document.createElement('i')
        newIcon.className = 'bi bi-check2 ms-auto'
        item.appendChild(newIcon)
      }
    } else {
      if (icon) icon.remove()
    }
  })
}

export function setupBootstrapSelectDropdownStyles() {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.classList.contains('dropdown-menu')) {
          const dropdown = node
          dropdown.classList.add('gap-1', 'px-2', 'rounded-3', 'mx-0', 'shadow')

          dropdown.querySelectorAll('.dropdown-item').forEach((item) => {
            item.classList.add(
              'rounded-2',
              'd-flex',
              'align-items-center',
              'justify-content-between',
            )
          })

          dropdown.querySelectorAll('li:not(:first-child)').forEach((li) => {
            li.classList.add('mt-1')
          })

          updateDropdownIcons(dropdown)
        }
      })
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })

  document.addEventListener('click', (e) => {
    const item = e.target.closest('.bootstrap-select .dropdown-item')
    if (item) {
      const dropdown = item.closest('.dropdown-menu')
      if (dropdown) updateDropdownIcons(dropdown)
    }
  })
}
