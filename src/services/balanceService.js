import httpClient from '../lib/httpClient.js'
import { unwrapResponse } from '../lib/apiHelpers.js'

export const getBalanceRequest = async () => {
  const response = await httpClient.get('/balance')
  return unwrapResponse(response)
}

export const topUpBalanceRequest = async (amount) => {
  const response = await httpClient.post('/topup', {
    top_up_amount: amount,
  })
  return unwrapResponse(response)
}
