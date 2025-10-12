import axios from 'axios'
import { clearToken, getStoredToken } from './tokenStorage.js'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://take-home-test-api.nutech-integrasi.com'

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken()
    }
    return Promise.reject(error)
  },
)

export default httpClient
