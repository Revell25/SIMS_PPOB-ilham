import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../auth/authThunks.js'
import { fetchTransactionHistory, createPayment } from './transactionThunks.js'

const initialState = {
  history: [],
  status: 'idle',
  error: null,
  paymentStatus: 'idle',
  paymentError: null,
  lastTransaction: null,
  message: null,
  meta: {
    limit: 0,
    offset: 0,
  },
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    resetTransactionMessage(state) {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionHistory.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.history = action.payload?.records ?? []
        state.meta = {
          limit: action.payload?.limit ?? 0,
          offset: action.payload?.offset ?? 0,
        }
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload ??
          action.error?.message ??
          'Gagal memuat riwayat transaksi'
      })
      .addCase(createPayment.pending, (state) => {
        state.paymentStatus = 'loading'
        state.paymentError = null
        state.message = null
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.paymentStatus = 'succeeded'
        state.lastTransaction = action.payload.data
        state.message = action.payload.message
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.paymentStatus = 'failed'
        state.paymentError =
          action.payload ??
          action.error?.message ??
          'Transaksi gagal diproses'
      })
      .addCase(logout.fulfilled, () => ({
        ...initialState,
      }))
  },
})

export const selectTransactionHistory = (state) => state.transactions.history
export const selectTransactionStatus = (state) => state.transactions.status
export const selectPaymentStatus = (state) => state.transactions.paymentStatus
export const selectLastTransaction = (state) =>
  state.transactions.lastTransaction
export const selectTransactionMessage = (state) => state.transactions.message

export const { resetTransactionMessage } = transactionsSlice.actions

export default transactionsSlice.reducer
