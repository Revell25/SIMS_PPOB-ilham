import { createSlice } from '@reduxjs/toolkit'
import { getStoredToken } from '../../lib/tokenStorage.js'
import { login, logout, register } from './authThunks.js'

const storedToken = getStoredToken()

const initialState = {
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
  status: 'idle',
  error: null,
  registerStatus: 'idle',
  registerError: null,
  message: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthMessage(state) {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.message = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.isAuthenticated = true
        state.message = action.payload.message
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error?.message ?? 'Login gagal'
      })
      .addCase(register.pending, (state) => {
        state.registerStatus = 'loading'
        state.registerError = null
        state.message = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerStatus = 'succeeded'
        state.message = action.payload.message
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = 'failed'
        state.registerError =
          action.payload ?? action.error?.message ?? 'Registrasi gagal'
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null
        state.isAuthenticated = false
        state.status = 'idle'
        state.registerStatus = 'idle'
        state.error = null
        state.registerError = null
        state.message = null
      })
  },
})

export const { resetAuthMessage } = authSlice.actions

export const selectAuth = (state) => state.auth
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthStatus = (state) => state.auth.status

export default authSlice.reducer
