import { Link } from 'react-router-dom'
import { formatCurrency } from '../../lib/format.js'

const BalanceCard = ({ name, balance }) => (
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-500 to-brand-600 p-6 text-white shadow-card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-brand-100">Saldo Anda</p>
        <p className="mt-2 text-3xl font-semibold">
          {formatCurrency(balance)}
        </p>
        <p className="mt-4 text-sm text-brand-100">
          Selamat datang kembali, <span className="font-semibold">{name}</span>
        </p>
      </div>
      <div className="hidden h-24 w-24 rounded-full border border-white/30 sm:block" />
    </div>

    <div className="mt-6 flex flex-wrap items-center gap-3">
      <Link
        to="/topup"
        className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-brand-600 transition hover:bg-brand-50"
      >
        Top Up
      </Link>
      <Link
        to="/history"
        className="rounded-full border border-white/40 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        Lihat Riwayat
      </Link>
    </div>
  </div>
)

export default BalanceCard
