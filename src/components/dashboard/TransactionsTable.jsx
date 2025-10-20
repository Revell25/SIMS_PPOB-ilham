import { formatCurrency, formatDateTime } from '../../lib/format.js'

const TransactionsTable = ({
  records = [],
  isLoading = false,
  emptyMessage = 'Tidak ada data transaksi.',
  skeletonCount = 5,
  className = '',
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={index}
            className="h-14 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (!records.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-slate-100">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Invoice
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tipe
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Deskripsi
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Jumlah
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tanggal
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {records.map((item) => (
            <tr key={item.invoice_number}>
              <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                {item.invoice_number}
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-slate-700">
                {item.transaction_type}
              </td>
              <td className="px-4 py-3 text-sm text-slate-600">
                {item.description}
              </td>
              <td className="px-4 py-3 text-right text-sm font-semibold">
                <span
                  className={
                    item.transaction_type === 'TOPUP'
                      ? 'text-emerald-600'
                      : 'text-slate-900'
                  }
                >
                  {item.transaction_type === 'TOPUP' ? '+' : '-'}{' '}
                  {formatCurrency(item.total_amount)}
                </span>
              </td>
              <td className="px-4 py-3 text-right text-sm text-slate-500">
                {formatDateTime(item.created_on)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable
