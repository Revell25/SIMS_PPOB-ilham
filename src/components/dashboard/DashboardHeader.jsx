import { useMemo, useState } from 'react'
import { formatCurrency } from '../../lib/format.js'
import defaultAvatar from '../../assets/profile-default.png'
import brandLogo from '../../assets/logo-sims-ppob.png'
import saldoBg from '../../assets/saldo-bg.png'

const DashboardHeader = ({ userName, profileImage, balance = 0, onRefreshBalance }) => {
  const [isHidden, setIsHidden] = useState(true)

  const displayName = useMemo(() => userName?.trim() || 'Pengguna', [userName])

  const avatarSrc = useMemo(() => {
    if (!profileImage) {
      return defaultAvatar
    }

    const normalized = `${profileImage}`.trim()
    const lower = normalized.toLowerCase()
    if (
      !normalized ||
      lower === 'null' ||
      lower === 'undefined' ||
      lower.endsWith('/null')
    ) {
      return defaultAvatar
    }

    return normalized
  }, [profileImage])

  return (
    <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-100 bg-slate-100">
          <img
            src={avatarSrc}
            alt={displayName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <p className="text-xl font-medium text-slate-600">Selamat datang,</p>
          <h2 className="text-2xl font-bold text-slate-900">{displayName}</h2>
        </div>
      </div>

      <div
        className="flex w-full max-w-3xl flex-col gap-4 rounded-3xl p-6 text-white shadow-card lg:ml-auto lg:flex-1"
        style={{
          backgroundImage: `url(${saldoBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundColor: '#ef4444',
        }}
      >
       
        <div>
          <p className="text-sm text-white/80">Saldo anda</p>
          <p className="mt-2 text-3xl font-semibold tracking-wide">
            {isHidden ? 'Rp \u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' : formatCurrency(balance)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsHidden((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            aria-label={isHidden ? 'Lihat saldo' : 'Tutup saldo'}
          >
            {isHidden ? (
              <>
                <span>Lihat Saldo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </>
            ) : (
              <>
                <span>Sembunyikan Saldo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.78 20.78 0 0 1 5.06-5.94" />
                  <path d="M1 1l22 22" />
                  <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.59" />
                  <path d="M9.88 5.12A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.12 21.12 0 0 1-5.1 6.02" />
                </svg>
              </>
            )}
          </button>
          {onRefreshBalance && (
            <button
              onClick={onRefreshBalance}
              className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/30"
            >
              Refresh
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default DashboardHeader
