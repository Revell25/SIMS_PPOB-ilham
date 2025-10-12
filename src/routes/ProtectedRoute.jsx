import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks.js'
import {
  selectAuthStatus,
  selectIsAuthenticated,
} from '../features/auth/authSlice.js'

const ProtectedRoute = () => {
  const location = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const authStatus = useAppSelector(selectAuthStatus)

  if (authStatus === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="rounded-full bg-white px-4 py-2 text-sm text-slate-500 shadow">
          Memuat sesi...
        </p>
      </div>
    )
  }

  if (!isAuthenticated && authStatus !== 'loading') {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
