import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../auth/authThunks.js'
import { fetchBalance, topUpBalance } from './balanceThunks.js'

const initialState = {
  value: 0,
  status: 'idle',
  error: null,
  topUpStatus: 'idle',
  topUpError: null,
  message: null,
}

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    resetBalanceMessage(state) {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = action.payload ?? state.value
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ?? action.error?.message ?? 'Gagal memuat saldo'
      })
      .addCase(topUpBalance.pending, (state) => {
        state.topUpStatus = 'loading'
        state.topUpError = null
        state.message = null
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.topUpStatus = 'succeeded'
        state.value =
          action.payload.balance ?? state.value + (action.meta.arg ?? 0)
        state.message = action.payload.message
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.topUpStatus = 'failed'
        state.topUpError =
          action.payload ?? action.error?.message ?? 'Top up saldo gagal'
      })
      .addCase(logout.fulfilled, () => ({
        ...initialState,
      }))
  },
})

export const { resetBalanceMessage } = balanceSlice.actions

export const selectBalance = (state) => state.balance.value
export const selectBalanceStatus = (state) => state.balance.status
export const selectBalanceMessage = (state) => state.balance.message
export const selectTopUpStatus = (state) => state.balance.topUpStatus

export default balanceSlice.reducer
