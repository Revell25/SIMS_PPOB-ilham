import httpClient from '../lib/httpClient.js'
import { unwrapResponse } from '../lib/apiHelpers.js'

export const getProfileRequest = async () => {
  const response = await httpClient.get('/profile')
  return unwrapResponse(response)
}

export const updateProfileRequest = async (payload) => {
  const response = await httpClient.put('/profile/update', payload)
  return unwrapResponse(response)
}

export const updateProfileImageRequest = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await httpClient.put('/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return unwrapResponse(response)
}
