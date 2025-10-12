import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from './app/hooks.js'
import { selectIsAuthenticated } from './features/auth/authSlice.js'
import { selectBalanceStatus } from './features/balance/balanceSlice.js'
import { fetchBalance } from './features/balance/balanceThunks.js'
import { selectProfileStatus } from './features/profile/profileSlice.js'
import { fetchProfile } from './features/profile/profileThunks.js'
import {
  selectServicesStatus,
  selectBannersStatus,
} from './features/services/servicesSlice.js'
import {
  fetchServices,
  fetchBanners,
} from './features/services/servicesThunks.js'
import {
  selectTransactionStatus,
} from './features/transactions/transactionsSlice.js'
import { fetchTransactionHistory } from './features/transactions/transactionThunks.js'
import appRouter from './routes/appRouter.jsx'

const App = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const profileStatus = useAppSelector(selectProfileStatus)
  const balanceStatus = useAppSelector(selectBalanceStatus)
  const servicesStatus = useAppSelector(selectServicesStatus)
  const bannerStatus = useAppSelector(selectBannersStatus)
  const historyStatus = useAppSelector(selectTransactionStatus)

  useEffect(() => {
    if (isAuthenticated && profileStatus === 'idle') {
      dispatch(fetchProfile())
    }
  }, [dispatch, isAuthenticated, profileStatus])

  useEffect(() => {
    if (isAuthenticated && balanceStatus === 'idle') {
      dispatch(fetchBalance())
    }
  }, [dispatch, isAuthenticated, balanceStatus])

  useEffect(() => {
    if (isAuthenticated && servicesStatus === 'idle') {
      dispatch(fetchServices())
    }
  }, [dispatch, isAuthenticated, servicesStatus])

  useEffect(() => {
    if (isAuthenticated && bannerStatus === 'idle') {
      dispatch(fetchBanners())
    }
  }, [dispatch, isAuthenticated, bannerStatus])

  useEffect(() => {
    if (isAuthenticated && historyStatus === 'idle') {
      dispatch(fetchTransactionHistory({ limit: 10 }))
    }
  }, [dispatch, isAuthenticated, historyStatus])

  return (
    <>
      <Suspense fallback={<div className="p-6 text-center text-slate-500">Loading...</div>}>
        <RouterProvider router={appRouter} />
      </Suspense>
      <Toaster position="top-center" />
    </>
  )
}

export default App
