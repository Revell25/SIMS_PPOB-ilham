import { useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks.js'
import BannerCarousel from '../../components/dashboard/BannerCarousel.jsx'
import ServiceGrid from '../../components/dashboard/ServiceGrid.jsx'
import { formatCurrency, formatDateTime } from '../../lib/format.js'
import { selectBalance } from '../../features/balance/balanceSlice.js'
import { fetchBalance } from '../../features/balance/balanceThunks.js'
import {
  fetchBanners,
  fetchServices,
} from '../../features/services/servicesThunks.js'
import {
  selectBanners,
  selectBannersStatus,
  selectServices,
  selectServicesStatus,
} from '../../features/services/servicesSlice.js'
import { selectProfile } from '../../features/profile/profileSlice.js'
import DashboardHeader from '../../components/dashboard/DashboardHeader.jsx'
import {
  fetchTransactionHistory,
} from '../../features/transactions/transactionThunks.js'
import {
  selectTransactionHistory,
  selectTransactionStatus,
} from '../../features/transactions/transactionsSlice.js'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const profile = useAppSelector(selectProfile)
  const balance = useAppSelector(selectBalance)
  const services = useAppSelector(selectServices)
  const servicesStatus = useAppSelector(selectServicesStatus)
  const banners = useAppSelector(selectBanners)
  const bannerStatus = useAppSelector(selectBannersStatus)
  const history = useAppSelector(selectTransactionHistory)
  const historyStatus = useAppSelector(selectTransactionStatus)
  const servicesError = useAppSelector((state) => state.catalog.error)
  const bannerError = useAppSelector((state) => state.catalog.bannerError)

  const userName = useMemo(() => {
    if (!profile) return 'Pengguna'
    const name = [profile.first_name, profile.last_name]
      .filter(Boolean)
      .join(' ')
    return name || 'Pengguna'
  }, [profile])

  const recentHistory = history.slice(0, 5)

  const handleRefreshBalance = () => {
    dispatch(fetchBalance())
  }

  const handleRefreshServices = () => {
    dispatch(fetchServices())
    dispatch(fetchBanners())
  }

  const handleRefreshHistory = () => {
    dispatch(fetchTransactionHistory({ limit: 10 }))
  }

  const handleSelectService = (service) => {
    navigate(`/payment?service=${service.service_code}`)
  }

  

  useEffect(() => {
    if (servicesError) {
      toast.error(servicesError)
    }
  }, [servicesError])

  useEffect(() => {
    if (bannerError) {
      toast.error(bannerError)
    }
  }, [bannerError])

  return (
    <div className="space-y-10">
      <DashboardHeader
        userName={userName}
        profileImage={profile?.profile_image}
        balance={balance}
        onRefreshBalance={handleRefreshBalance}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Layanan SIMS PPOB
          </h3>
          <p className="text-sm text-slate-500">
            Pilih layanan untuk memulai pembayaran
          </p>
        </div>
        <ServiceGrid
          services={services}
          loading={servicesStatus === 'loading'}
          onSelect={handleSelectService}
          showPrice={false}
        />
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Temukan promo menarik
          </h3>
          <button
            onClick={handleRefreshServices}
            className="text-sm font-semibold text-brand-600 hover:text-brand-500"
          >
            Muat ulang
          </button>
        </div>
        <div className="mt-4">
          <BannerCarousel
            banners={banners}
            loading={bannerStatus === 'loading'}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Riwayat Terbaru
          </h3>
          <button
            onClick={handleRefreshHistory}
            className="text-sm font-semibold text-brand-600 hover:text-brand-500"
          >
            Muat ulang
          </button>
        </div>

        {historyStatus === 'loading' ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : recentHistory.length ? (
          <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
            {recentHistory.map((item) => (
              <div
                key={item.invoice_number}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDateTime(item.created_on)}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      item.transaction_type === 'TOPUP'
                        ? 'text-emerald-600'
                        : 'text-slate-900'
                    }`}
                  >
                    {item.transaction_type === 'TOPUP' ? '+' : '-'}{' '}
                    {formatCurrency(item.total_amount)}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.invoice_number}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
            Belum ada riwayat transaksi.
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
