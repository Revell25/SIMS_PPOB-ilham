import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import profileReducer from '../features/profile/profileSlice.js'
import balanceReducer from '../features/balance/balanceSlice.js'
import catalogReducer from '../features/services/servicesSlice.js'
import transactionsReducer from '../features/transactions/transactionsSlice.js'

export const createAppStore = (preloadedState) =>
  configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      balance: balanceReducer,
      catalog: catalogReducer,
      transactions: transactionsReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

export const store = createAppStore()

export default store
