import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../lib/apiHelpers.js'
import {
  getBannersRequest,
  getServicesRequest,
} from '../../services/catalogService.js'

export const fetchServices = createAsyncThunk(
  'catalog/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getServicesRequest()
      return result?.data ?? []
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Gagal memuat daftar layanan'),
      )
    }
  },
)

export const fetchBanners = createAsyncThunk(
  'catalog/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getBannersRequest()
      return result?.data ?? []
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Gagal memuat banner promosi'),
      )
    }
  },
)
