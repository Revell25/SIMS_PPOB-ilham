export const unwrapResponse = (response) => response?.data ?? null

export const getErrorMessage = (error, fallbackMessage = 'Terjadi kesalahan. Silakan coba lagi.') => {
  if (!error) {
    return fallbackMessage
  }

  if (error.response?.data?.message) {
    return error.response.data.message
  }

  if (error.message) {
    return error.message
  }

  return fallbackMessage
}
