import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks.js'
import DashboardHeader from '../../components/dashboard/DashboardHeader.jsx'
import InputField from '../../components/form/InputField.jsx'
import Button from '../../components/ui/Button.jsx'
import {
  resetBalanceMessage,
  selectBalanceMessage,
  selectTopUpStatus,
} from '../../features/balance/balanceSlice.js'
import {
  fetchBalance,
  topUpBalance,
} from '../../features/balance/balanceThunks.js'
import { selectProfile } from '../../features/profile/profileSlice.js'
import { selectBalance } from '../../features/balance/balanceSlice.js'
import { topUpSchema } from '../../features/balance/balanceSchemas.js'
import { fetchTransactionHistory } from '../../features/transactions/transactionThunks.js'

const TOP_UP_OPTIONS = [10000, 20000, 50000, 100000, 200000, 500000]

const TopUpPage = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const balance = useAppSelector(selectBalance)

  const userName = useMemo(() => {
    if (!profile) return 'Pengguna'
    const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ')
    return name || 'Pengguna'
  }, [profile])

  const form = useForm({
    resolver: zodResolver(topUpSchema),
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
  })

  const topUpStatus = useAppSelector(selectTopUpStatus)
  const balanceMessage = useAppSelector(selectBalanceMessage)
  const topUpError = useAppSelector((state) => state.balance.topUpError)

  useEffect(() => {
    if (balanceMessage) {
      toast.success(balanceMessage)
      dispatch(resetBalanceMessage())
      dispatch(fetchTransactionHistory({ limit: 10 }))
    }
  }, [balanceMessage, dispatch])

  useEffect(() => {
    if (topUpError) {
      toast.error(topUpError)
    }
  }, [topUpError])

  const handleSelectAmount = (amount) => {
    form.setValue('amount', amount, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    })
  }

  const onSubmit = async (values) => {
    await dispatch(topUpBalance(values.amount))
    dispatch(fetchBalance())
    form.reset({ amount: '' })
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
        <div className="mb-6">
          <p className="mt-1 text-sm text-slate-500" >Silahkan Masukkan</p>
          <h2 className="text-xl font-semibold text-slate-900">
            Nominal Top Up
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
          <div className="space-y-4">
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <InputField
                id="amount"
                type="number"
                min="10000"
                step="1000"
                inputMode="numeric"
                placeholder="Contoh: 100000"
                error={form.formState.errors.amount?.message}
                {...form.register('amount', { valueAsNumber: true })}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  isLoading={topUpStatus === 'loading'}
                  disabled={topUpStatus === 'loading' || !form.formState.isValid}
                  className="w-full"
                >
                  Konfirmasi Top Up
                </Button>
              </div>
            </form>
          </div>

          <aside className="grid gap-3 sm:grid-cols-3  lg:grid-cols-2">
            {TOP_UP_OPTIONS.map((amount) => {
              const isSelected = form.getValues('amount') === amount
              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleSelectAmount(amount)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    isSelected
                      ? 'border-brand-400 bg-brand-50 text-brand-600'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-200'
                  }`}
                >
                  Rp {amount.toLocaleString('id-ID')}
                </button>
              )
            })}
          </aside>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Panduan Top Up
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-500">
          <li>Minimal nominal top up adalah Rp10.000.</li>
          <li>Pastikan saldo mencukupi sebelum melakukan pembayaran.</li>
          <li>
            Riwayat top up akan otomatis tercatat pada halaman riwayat
            transaksi.
          </li>
        </ul>
      </section>
    </div>
  )
}

export default TopUpPage
