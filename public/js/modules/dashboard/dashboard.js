/**
 * dashboard.js
 *
 * Initializes Chart.js charts for borrowed books, returned books, average loan time, and loan comparison.
 * Retrieves dashboard data from RESTful API endpoints using the Fetch API,
 * and updates charts and statistics dynamically on the page.
 *
 * @author Jason
 */

const PUBLIC_API_URL = window.APP_CONFIG?.PUBLIC_API_URL || 'http://localhost:8080'

import { showToast } from '/js/shared/utils/ui/index.js'

function getThemeBorderColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--bs-border-color').trim()
}

$(document).ready(function () {
  const charts = []

  const borrowedBooksChart = new Chart($('#borrowedBooksChart'), {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Libros prestados',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: getThemeBorderColor() },
        },
        y: {
          beginAtZero: true,
          grid: { color: getThemeBorderColor() },
        },
      },
    },
  })
  charts.push(borrowedBooksChart)

  const returnedBooksChart = new Chart($('#returnedBooksChart'), {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Libros devueltos',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: getThemeBorderColor() },
        },
        x: {
          grid: { color: getThemeBorderColor() },
        },
      },
    },
  })
  charts.push(returnedBooksChart)

  const avgLoanTimeChart = new Chart($('#avgLoanTimeChart'), {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Duración promedio de préstamo (días)',
          data: [],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: getThemeBorderColor() },
        },
        x: {
          grid: { color: getThemeBorderColor() },
        },
      },
    },
  })
  charts.push(avgLoanTimeChart)

  const loanComparisonChart = new Chart($('#loanComparisonChart'), {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Año anterior',
          data: [],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
        {
          label: 'Año actual',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: getThemeBorderColor() },
        },
        x: {
          grid: { color: getThemeBorderColor() },
        },
      },
    },
  })
  charts.push(loanComparisonChart)

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-bs-theme') {
        const borderColor = getThemeBorderColor()
        charts.forEach((chart) => {
          if (chart.options.scales?.x?.grid) {
            chart.options.scales.x.grid.color = borderColor
          }
          if (chart.options.scales?.y?.grid) {
            chart.options.scales.y.grid.color = borderColor
          }
          chart.update()
        })
      }
    }
  })
  observer.observe(document.documentElement, { attributes: true })

  const currentYear = new Date().getFullYear()
  const lastYear = currentYear - 1

  fetch(`${PUBLIC_API_URL}/api/dashboard?year1=${currentYear}&year2=${lastYear}`)
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch dashboard data')
      return response.json()
    })
    .then((data) => {
      const loansData = []
      const returnsData = []
      const avgDurationData = []

      for (let m = 1; m <= 6; m++) {
        loansData.push(data.loansByMonth[m] || 0)
        returnsData.push(data.returnsByMonth[m] || 0)
        avgDurationData.push(data.averageLoanDurationByMonth[m] || 0)
      }

      borrowedBooksChart.data.datasets[0].data = loansData
      borrowedBooksChart.update()
      showChart('borrowedBooksChart')

      returnedBooksChart.data.datasets[0].data = returnsData
      returnedBooksChart.update()
      showChart('returnedBooksChart')

      avgLoanTimeChart.data.datasets[0].data = avgDurationData
      avgLoanTimeChart.update()
      showChart('avgLoanTimeChart')

      const comparison = data.monthlyLoanComparison
      comparison.sort((a, b) => a.month - b.month)

      const year1Data = []
      const year2Data = []

      for (let i = 1; i <= 6; i++) {
        const comp = comparison.find((item) => item.month === i)
        if (comp) {
          year1Data.push(comp.loansYear1)
          year2Data.push(comp.loansYear2)
        } else {
          year1Data.push(0)
          year2Data.push(0)
        }
      }

      loanComparisonChart.data.datasets[0].data = year1Data
      loanComparisonChart.data.datasets[1].data = year2Data
      loanComparisonChart.update()
      showChart('loanComparisonChart')

      updateStatCardValue('#totalBooks', `${data.totalActiveBooks} Libros activos`)
      updateStatCardValue('#totalAuthors', `${data.totalActiveAuthors} Autores activos`)
      updateStatCardValue('#totalPublishers', `${data.totalActivePublishers} Editoriales activas`)
      updateStatCardValue('#totalCourses', `${data.totalActiveCourses} Cursos activos`)
      updateStatCardValue('#totalStudents', `${data.totalActiveStudents} Estudiantes activos`)
      updateStatCardValue('#totalLoans', `${data.totalActiveLoans} Préstamos activos`)
    })
    .catch((err) => {
      console.error('Error fetching dashboard data:', err)
      showToast('Hubo un error al listar los datos del dashboard.', 'error')
    })
})

function hidePlaceholderFor(el) {
  const placeholder = el?.previousElementSibling
  if (placeholder?.classList.contains('placeholder-glow')) {
    placeholder.classList.add('d-none')
  }
}

function updateStatCardValue(selector, text) {
  const valueEl = document.querySelector(selector)
  if (!valueEl) return

  hidePlaceholderFor(valueEl)
  valueEl.textContent = text
  valueEl.classList.remove('d-none')
}

function showChart(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return

  hidePlaceholderFor(canvas)
  canvas.classList.remove('d-none')
}
