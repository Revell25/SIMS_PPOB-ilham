import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../lib/apiHelpers.js'
import { logout } from '../auth/authThunks.js'
import {
  getProfileRequest,
  updateProfileImageRequest,
  updateProfileRequest,
} from '../../services/profileService.js'

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const result = await getProfileRequest()
      return result?.data
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logout())
      }
      return rejectWithValue(
        getErrorMessage(error, 'Gagal memuat data profil pengguna'),
      )
    }
  },
)

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const result = await updateProfileRequest(payload)
      return result?.message ?? 'Profil berhasil diperbarui'
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Gagal memperbarui data profil'),
      )
    }
  },
)

export const updateProfileImage = createAsyncThunk(
  'profile/updateProfileImage',
  async (file, { rejectWithValue }) => {
    try {
      const result = await updateProfileImageRequest(file)
      return {
        message: result?.message ?? 'Foto profil berhasil diperbarui',
        profile: result?.data,
      }
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Gagal memperbarui foto profil'),
      )
    }
  },
)
