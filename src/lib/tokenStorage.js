const TOKEN_KEY = 'sims_ppob_token'

export const getStoredToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch (error) {
    console.error('Failed to read token from storage', error)
    return null
  }
}

export const persistToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  } catch (error) {
    console.error('Failed to persist token', error)
  }
}

export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch (error) {
    console.error('Failed to clear token', error)
  }
}
