import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hooks.js"
import { selectIsAuthenticated } from "../../features/auth/authSlice.js"

const PublicLayout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default PublicLayout
