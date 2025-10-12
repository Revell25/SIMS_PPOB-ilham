import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks.js'
import { logout } from '../../features/auth/authThunks.js'
import { selectProfile } from '../../features/profile/profileSlice.js'

const navItems = [
  {
    to: '/topup',
    label: 'Top Up',
    matcher: (path) => path.startsWith('/topup'),
  },
  {
    to: '/payment',
    label: 'Transaksi',
    matcher: (path) => path.startsWith('/payment'),
  },
  {
    to: '/history',
    label: 'Riwayat',
    matcher: (path) => path.startsWith('/history'),
  },
  {
    to: '/profile',
    label: 'Akun',
    matcher: (path) => path.startsWith('/profile'),
  },
]

const DashboardLayout = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const profile = useAppSelector(selectProfile)

  useEffect(() => {
    document.title = 'SIMS PPOB'
  }, [])

  const handleLogout = async () => {
    await dispatch(logout())
    toast.success('Berhasil keluar dari sesi')
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-white">
              S
            </div>
            <h1 className="text-lg font-semibold text-slate-900">SIMS PPOB</h1>
          </NavLink>

          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = item.matcher
                ? item.matcher(location.pathname)
                : location.pathname === item.to

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? 'text-brand-600'
                      : 'text-slate-500 hover:text-brand-500'
                  }`}
                >
                  {item.label}
                </NavLink>
              )
            })}

            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-brand-400 hover:text-brand-600"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <Outlet context={{ profile }} />
      </main>
    </div>
  )
}

export default DashboardLayout
