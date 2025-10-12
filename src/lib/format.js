const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export const formatCurrency = (value) =>
  currencyFormatter.format(Number(value ?? 0))

export const formatDateTime = (value) => {
  try {
    return dateFormatter.format(new Date(value))
  } catch {
    return value
  }
}
