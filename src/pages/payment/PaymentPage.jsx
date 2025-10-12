import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks.js'
import ServiceGrid from '../../components/dashboard/ServiceGrid.jsx'
import Button from '../../components/ui/Button.jsx'
import { formatCurrency } from '../../lib/format.js'
import { selectBalance } from '../../features/balance/balanceSlice.js'
import {
  fetchBalance,
} from '../../features/balance/balanceThunks.js'
import { selectProfile } from '../../features/profile/profileSlice.js'
import DashboardHeader from '../../components/dashboard/DashboardHeader.jsx'
import {
  selectServices,
  selectServicesStatus,
} from '../../features/services/servicesSlice.js'
import {
  createPayment,
  fetchTransactionHistory,
} from '../../features/transactions/transactionThunks.js'
import {
  resetTransactionMessage,
  selectLastTransaction,
  selectPaymentStatus,
  selectTransactionMessage,
} from '../../features/transactions/transactionsSlice.js'

const PaymentPage = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const services = useAppSelector(selectServices)
  const servicesStatus = useAppSelector(selectServicesStatus)
  const balance = useAppSelector(selectBalance)
  const profile = useAppSelector(selectProfile)
  const paymentStatus = useAppSelector(selectPaymentStatus)
  const paymentMessage = useAppSelector(selectTransactionMessage)
  const paymentError = useAppSelector((state) => state.transactions.paymentError)
  const lastTransaction = useAppSelector(selectLastTransaction)
  const servicesError = useAppSelector((state) => state.catalog.error)

  const [selectedService, setSelectedService] = useState(null)
  const userName = useMemo(() => {
    if (!profile) return 'Pengguna'
    const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ')
    return name || 'Pengguna'
  }, [profile])

  const preselectedCode = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return params.get('service')
  }, [location.search])

  useEffect(() => {
    if (services.length && preselectedCode) {
      const match = services.find(
        (service) => service.service_code === preselectedCode,
      )
      if (match) {
        setSelectedService(match)
      }
    }
  }, [services, preselectedCode])

  useEffect(() => {
    if (paymentMessage) {
      toast.success(paymentMessage)
      dispatch(resetTransactionMessage())
      dispatch(fetchBalance())
      dispatch(fetchTransactionHistory({ limit: 10 }))
    }
  }, [paymentMessage, dispatch])

  useEffect(() => {
    if (paymentError) {
      toast.error(paymentError)
    }
  }, [paymentError])

  useEffect(() => {
    if (servicesError) {
      toast.error(servicesError)
    }
  }, [servicesError])

  const handleSelectService = (service) => {
    setSelectedService(service)
  }

  const handlePayment = async () => {
    if (!selectedService) return
    await dispatch(createPayment(selectedService.service_code))
  }

  const handleRefreshBalance = () => {
    dispatch(fetchBalance())
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        userName={userName}
        profileImage={profile?.profile_image}
        balance={balance}
        onRefreshBalance={handleRefreshBalance}
      />
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Pembayaran Layanan
            </h2>
            <p className="text-sm text-slate-500">
              Pilih layanan dan lakukan pembayaran secara instan.
            </p>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            Saldo: {formatCurrency(balance)}
          </div>
        </div>

        <div className="mt-6">
          <ServiceGrid
            services={services}
            loading={servicesStatus === 'loading'}
            onSelect={handleSelectService}
            showPrice
          />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Ringkasan Pembayaran
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Konfirmasi detail pembayaran sebelum melanjutkan.
        </p>

        {selectedService ? (
          <div className="mt-4 space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {selectedService.service_code}
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {selectedService.service_name}
                </p>
              </div>
              <p className="text-xl font-semibold text-slate-900">
                {formatCurrency(selectedService.service_tariff)}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-500">
                Transaksi tercatat otomatis dan dapat dilihat pada riwayat.
              </div>
              <Button
                onClick={handlePayment}
                isLoading={paymentStatus === 'loading'}
                className="sm:w-auto"
              >
                {paymentStatus === 'loading' ? 'Memproses...' : 'Bayar Sekarang'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
            Pilih layanan terlebih dahulu untuk melihat ringkasan pembayaran.
          </div>
        )}
      </section>

      {lastTransaction && (
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-slate-800">
          <h4 className="text-sm font-semibold text-emerald-700">
            Transaksi terbaru
          </h4>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-sm text-slate-600">Invoice</p>
              <p className="text-base font-semibold">
                {lastTransaction.invoice_number}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Layanan</p>
              <p className="text-base font-semibold">
                {lastTransaction.service_name}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-base font-semibold">
                {formatCurrency(lastTransaction.total_amount)}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default PaymentPage
