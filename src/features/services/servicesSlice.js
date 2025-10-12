import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../auth/authThunks.js'
import { fetchBanners, fetchServices } from './servicesThunks.js'

const initialState = {
  services: [],
  status: 'idle',
  error: null,
  banners: [],
  bannerStatus: 'idle',
  bannerError: null,
}

const servicesSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.services = action.payload ?? []
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ??
          action.error?.message ??
          'Gagal memuat layanan'
      })
      .addCase(fetchBanners.pending, (state) => {
        state.bannerStatus = 'loading'
        state.bannerError = null
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.bannerStatus = 'succeeded'
        state.banners = action.payload ?? []
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.bannerStatus = 'failed'
        state.bannerError =
          action.payload ??
          action.error?.message ??
          'Gagal memuat banner'
      })
      .addCase(logout.fulfilled, () => ({
        ...initialState,
      }))
  },
})

export const selectServices = (state) => state.catalog.services
export const selectServicesStatus = (state) => state.catalog.status
export const selectBanners = (state) => state.catalog.banners
export const selectBannersStatus = (state) => state.catalog.bannerStatus

export default servicesSlice.reducer
