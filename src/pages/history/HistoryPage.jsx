import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "../../app/hooks.js"
import Button from "../../components/ui/Button.jsx"
import { formatCurrency, formatDateTime } from "../../lib/format.js"
import { fetchTransactionHistory } from "../../features/transactions/transactionThunks.js"
import {
  selectTransactionHistory,
  selectTransactionStatus,
} from "../../features/transactions/transactionsSlice.js"
import { selectProfile } from "../../features/profile/profileSlice.js"
import { selectBalance } from "../../features/balance/balanceSlice.js"
import { fetchBalance } from "../../features/balance/balanceThunks.js"
import DashboardHeader from "../../components/dashboard/DashboardHeader.jsx"

const HISTORY_LIMIT_OPTIONS = [10, 20, 30]

const HistoryPage = () => {
  const dispatch = useAppDispatch()
  const history = useAppSelector(selectTransactionHistory)
  const historyStatus = useAppSelector(selectTransactionStatus)
  const historyError = useAppSelector((state) => state.transactions.error)
  const profile = useAppSelector(selectProfile)
  const balance = useAppSelector(selectBalance)
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [historyItems, setHistoryItems] = useState([])

  const userName = useMemo(() => {
    if (!profile) return 'Pengguna'
    const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ')
    return name || 'Pengguna'
  }, [profile])

  useEffect(() => {
    setOffset(0)
    setHistoryItems([])
    dispatch(fetchTransactionHistory({ limit, offset: 0 }))
  }, [dispatch, limit])

  useEffect(() => {
    if (historyStatus === 'succeeded' && history?.length) {
      setHistoryItems((prev) => {
        const existingIds = new Set(prev.map((item) => item.invoice_number))
        const merged = [...prev]
        history.forEach((item) => {
          if (!existingIds.has(item.invoice_number)) {
            merged.push(item)
          }
        })
        return merged
      })
    }
  }, [history, historyStatus])

  useEffect(() => {
    if (historyError) {
      toast.error(historyError)
    }
  }, [historyError])

  const handleRefresh = () => {
    setOffset(0)
    setHistoryItems([])
    dispatch(fetchTransactionHistory({ limit, offset: 0 }))
  }

  const handleRefreshBalance = () => {
    dispatch(fetchBalance())
  }

  const handleLimitChange = (event) => {
    const value = Number(event.target.value)
    setLimit(value)
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        userName={userName}
        profileImage={profile?.profile_image}
        balance={balance}
        onRefreshBalance={handleRefreshBalance}
      />
      <section className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Semua Transaksi</h2>
            <p className="text-sm text-slate-500">
              Riwayat top up dan pembayaran terbaru Anda.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-500">
              Tampilkan
              <select
                value={limit}
                onChange={handleLimitChange}
                className="ml-2 rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                {HISTORY_LIMIT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
               
            </label>
            <Button onClick={handleRefresh} variant="secondary" className="sm:w-auto">
              Muat ulang
            </Button>
          </div>
        </div>

        {historyStatus === "loading" && historyItems.length === 0 ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-2xl bg-white/60"
              />
            ))}
          </div>
        ) : historyItems.length ? (
          <div className="space-y-3">
            {historyItems.map((item) => {
              const isTopUp = item.transaction_type === "TOPUP"
              const amountSign = isTopUp ? "+" : "-"
              const amountColor = isTopUp ? "text-emerald-500" : "text-brand-600"
              return (
                <div
                  key={item.invoice_number}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
                >
                  <div className="space-y-1">
                    <p className={`text-lg font-semibold ${amountColor}`}>
                      {amountSign} {formatCurrency(item.total_amount)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatDateTime(item.created_on)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-700">
                      {item.description || item.invoice_number}
                    </p>
                    <p className="text-xs text-slate-400">
                      {isTopUp ? "Top up Saldo" : "Pembayaran Layanan"}
                    </p>
                  </div>
                </div>
              )
            })}
            {historyStatus === 'loading' && historyItems.length > 0 && (
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="h-20 animate-pulse rounded-2xl bg-white/60"
                  />
                ))}
              </div>
            )}
            <div className="flex justify-center pt-2">
              <Button
                onClick={() => {
                  const nextOffset = offset + limit
                  setOffset(nextOffset)
                  dispatch(fetchTransactionHistory({ limit, offset: nextOffset }))
                }}
                variant="ghost"
                className="w-full max-w-xs border border-brand-200 text-brand-600 hover:bg-brand-50"
                disabled={historyStatus === 'loading'}
              >
                {historyStatus === 'loading' ? 'Memuat...' : 'Show More'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            Belum ada riwayat transaksi untuk ditampilkan.
          </div>
        )}
      </section>
    </div>
  )
}

export default HistoryPage
