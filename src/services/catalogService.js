import httpClient from '../lib/httpClient.js'
import { unwrapResponse } from '../lib/apiHelpers.js'

export const getBannersRequest = async () => {
  const response = await httpClient.get('/banner')
  return unwrapResponse(response)
}

export const getServicesRequest = async () => {
  const response = await httpClient.get('/services')
  return unwrapResponse(response)
}
