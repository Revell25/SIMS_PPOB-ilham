import { formatCurrency } from '../../lib/format.js'

const colorPalette = [
  { iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  { iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
  { iconBg: 'bg-sky-50', iconColor: 'text-sky-500' },
  { iconBg: 'bg-rose-50', iconColor: 'text-rose-500' },
  { iconBg: 'bg-violet-50', iconColor: 'text-violet-500' },
  { iconBg: 'bg-lime-50', iconColor: 'text-lime-500' },
  { iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500' },
  { iconBg: 'bg-cyan-50', iconColor: 'text-cyan-500' },
  { iconBg: 'bg-slate-50', iconColor: 'text-slate-500' },
  { iconBg: 'bg-fuchsia-50', iconColor: 'text-fuchsia-500' },
]

const ServiceGrid = ({
  services = [],
  onSelect,
  loading = false,
  showPrice = false,
}) => {
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (!services.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        Belum ada layanan tersedia.
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
      {services.map((service, index) => {
        const palette = colorPalette[index % colorPalette.length]

        return (
          <button
            key={service.service_code}
            type="button"
            onClick={() => onSelect?.(service)}
            className="group flex h-full flex-col items-center gap-2 rounded-2xl bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-xl font-semibold ring-4 ring-transparent ring-offset-2 ring-offset-white transition group-hover:ring-brand-100 ${palette.iconBg} ${palette.iconColor}`}
            >
              <img
                src={service.service_icon}
                alt={service.service_name}
                className="h-10 w-10 object-contain"
                loading="lazy"
              />
            </span>
            <div className="flex flex-col items-center text-center">
              <p className="text-[11px] font-semibold text-slate-700 sm:text-xs">
                {service.service_name}
              </p>
              {showPrice && (
                <p className="text-[10px] text-slate-500 sm:text-[11px]">
                  {formatCurrency(service.service_tariff)}
                </p>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default ServiceGrid
