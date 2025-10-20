import { useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks.js'
import BannerCarousel from '../../components/dashboard/BannerCarousel.jsx'
import ServiceGrid from '../../components/dashboard/ServiceGrid.jsx'
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
import TransactionsTable from '../../components/dashboard/TransactionsTable.jsx'

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

        <TransactionsTable
          records={recentHistory}
          isLoading={historyStatus === 'loading'}
          emptyMessage="Belum ada riwayat transaksi."
          skeletonCount={3}
        />
      </section>
    </div>
  )
}

export default HomePage
