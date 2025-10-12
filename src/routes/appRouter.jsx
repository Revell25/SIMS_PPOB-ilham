import { createBrowserRouter, Navigate } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'
import PublicLayout from '../components/layout/PublicLayout.jsx'
import LoginPage from '../pages/auth/LoginPage.jsx'
import RegisterPage from '../pages/auth/RegisterPage.jsx'
import HomePage from '../pages/dashboard/HomePage.jsx'
import ProfilePage from '../pages/dashboard/ProfilePage.jsx'
import HistoryPage from '../pages/history/HistoryPage.jsx'
import PaymentPage from '../pages/payment/PaymentPage.jsx'
import TopUpPage from '../pages/topup/TopUpPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

export const appRouter = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
          {
            path: '/topup',
            element: <TopUpPage />,
          },
          {
            path: '/payment',
            element: <PaymentPage />,
          },
          {
            path: '/history',
            element: <HistoryPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])

export default appRouter
