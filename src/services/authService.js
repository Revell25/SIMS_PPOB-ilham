import httpClient from '../lib/httpClient.js'
import { unwrapResponse } from '../lib/apiHelpers.js'

export const loginRequest = async (payload) => {
  const response = await httpClient.post('/login', payload)
  return unwrapResponse(response)
}

export const registerRequest = async (payload) => {
  const response = await httpClient.post('/registration', payload)
  return unwrapResponse(response)
}
