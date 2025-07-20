const PUBLIC_API_URL = window.APP_CONFIG?.PUBLIC_API_URL || 'http://localhost:8080'

export async function loadSelectOptions({ resource, onSuccess }) {
  const url = `${PUBLIC_API_URL}/api/${resource}/select-options`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (response.status === 204) {
      console.warn(`No data found for select options at ${url}.`)
      return
    }

    if (!response.ok) {
      throw response
    }

    const data = await response.json()

    if (typeof onSuccess === 'function') {
      onSuccess(data)
    }
  } catch (error) {
    if (error instanceof Response) {
      try {
        const errData = await error.json()
        console.error(
          `Error fetching ${url} (${errData.errorType} - ${error.status}):`,
          errData.message,
        )
      } catch {
        console.error('Unexpected error:', error.status, await error.text())
      }
    } else {
      console.error('Unexpected error:', error)
    }
  }
}

export function populateSelect(selector, dataList, valueKey, textKey, badgeValueKey = null) {
  if (!badgeValueKey && dataList.length > 0) {
    const inferredKey = 'formatted' + valueKey.charAt(0).toUpperCase() + valueKey.slice(1)
    if (inferredKey in dataList[0]) {
      badgeValueKey = inferredKey
    }
  }

  const select = $(selector).selectpicker('destroy').empty()

  dataList.forEach((item) => {
    if (item[valueKey]) {
      let content = item[textKey]

      if (badgeValueKey && item[badgeValueKey] !== undefined) {
        const badgeValue = item[badgeValueKey]
        content += ` <span class="badge bg-body-tertiary text-body-emphasis border ms-1">${badgeValue}</span>`
      }

      select.append(
        $('<option>', {
          value: item[valueKey],
        }).attr('data-content', content),
      )
    }
  })
}
