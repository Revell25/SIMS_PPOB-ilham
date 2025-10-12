import { createAsyncThunk } from '@reduxjs/toolkit'
import { getErrorMessage } from '../../lib/apiHelpers.js'
import {
  getBalanceRequest,
  topUpBalanceRequest,
} from '../../services/balanceService.js'

export const fetchBalance = createAsyncThunk(
  'balance/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getBalanceRequest()
      return result?.data?.balance ?? 0
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Gagal memuat informasi saldo'),
      )
    }
  },
)

export const topUpBalance = createAsyncThunk(
  'balance/topUpBalance',
  async (amount, { rejectWithValue }) => {
    try {
      const result = await topUpBalanceRequest(amount)
      return {
        balance: result?.data?.balance ?? null,
        message: result?.message ?? 'Top up saldo berhasil',
      }
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Top up saldo gagal'),
      )
    }
  },
)
