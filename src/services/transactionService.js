import httpClient from '../lib/httpClient.js'
import { unwrapResponse } from '../lib/apiHelpers.js'

export const createTransactionRequest = async (serviceCode) => {
  const response = await httpClient.post('/transaction', {
    service_code: serviceCode,
  })
  return unwrapResponse(response)
}

export const getTransactionHistoryRequest = async (params) => {
  const response = await httpClient.get('/transaction/history', {
    params,
  })
  return unwrapResponse(response)
}
