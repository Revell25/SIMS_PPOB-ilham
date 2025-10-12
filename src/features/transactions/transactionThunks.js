import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../lib/apiHelpers.js'
import {
  createTransactionRequest,
  getTransactionHistoryRequest,
} from '../../services/transactionService.js'

export const fetchTransactionHistory = createAsyncThunk(
  'transactions/fetchHistory',
  async (params = {}, { rejectWithValue }) => {
    try {
      const result = await getTransactionHistoryRequest(params)
      return result?.data ?? { records: [], limit: params.limit ?? 0 }
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Gagal memuat riwayat transaksi'),
      )
    }
  },
)

export const createPayment = createAsyncThunk(
  'transactions/createPayment',
  async (serviceCode, { rejectWithValue }) => {
    try {
      const result = await createTransactionRequest(serviceCode)
      return {
        data: result?.data ?? null,
        message: result?.message ?? 'Transaksi berhasil',
      }
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Transaksi gagal diproses'),
      )
    }
  },
)
