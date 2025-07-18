export function getCurrentPeruDate() {
  const peruDateStr = new Date().toLocaleString('en-US', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const [month, day, year] = peruDateStr.split('/')
  return new Date(`${year}-${month}-${day}`)
}
