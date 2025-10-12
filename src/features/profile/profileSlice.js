import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../auth/authThunks.js'
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from './profileThunks.js'

const initialState = {
  data: null,
  status: 'idle',
  error: null,
  updateStatus: 'idle',
  updateError: null,
  imageStatus: 'idle',
  imageError: null,
  message: null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileMessage(state) {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ?? action.error?.message ?? 'Gagal memuat profil'
      })

      // Update profile text data
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus = 'loading'
        state.updateError = null
        state.message = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded'
        state.message = action.payload
        if (state.data) {
          state.data = {
            ...state.data,
            ...action.meta.arg,
          }
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus = 'failed'
        state.updateError =
          action.payload ?? action.error?.message ?? 'Gagal memperbarui profil'
      })

      // Update profile image
      .addCase(updateProfileImage.pending, (state) => {
        state.imageStatus = 'loading'
        state.imageError = null
        state.message = null
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.imageStatus = 'succeeded'
        state.message = action.payload.message
        state.data = action.payload.profile ?? state.data
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.imageStatus = 'failed'
        state.imageError =
          action.payload ??
          action.error?.message ??
          'Gagal memperbarui foto profil'
      })
      .addCase(logout.fulfilled, () => ({
        ...initialState,
      }))
  },
})

export const { resetProfileMessage } = profileSlice.actions

export const selectProfile = (state) => state.profile.data
export const selectProfileStatus = (state) => state.profile.status
export const selectProfileMessage = (state) => state.profile.message

export default profileSlice.reducer
