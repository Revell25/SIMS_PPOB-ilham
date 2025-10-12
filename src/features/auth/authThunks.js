import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../lib/apiHelpers.js'
import { persistToken, clearToken } from '../../lib/tokenStorage.js'
import { loginRequest, registerRequest } from '../../services/authService.js'

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await loginRequest(credentials)
      const token = result?.data?.token

      if (!token) {
        return rejectWithValue('Token tidak ditemukan pada response login.')
      }

      persistToken(token)

      return {
        token,
        message: result?.message ?? 'Login berhasil',
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Login gagal'))
    }
  },
)

export const register = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await registerRequest(payload)

      return {
        message: result?.message ?? 'Registrasi berhasil',
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Registrasi gagal'))
    }
  },
)

export const logout = createAsyncThunk('auth/logout', async () => {
  clearToken()
  return true
})
