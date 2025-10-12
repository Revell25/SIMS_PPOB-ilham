import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks.js'
import InputField from '../../components/form/InputField.jsx'
import Button from '../../components/ui/Button.jsx'
import brandLogo from '../../assets/logo-sims-ppob.png'
import authIllustration from '../../assets/auth-illustration.png'
import {
  resetAuthMessage,
  selectAuth,
} from '../../features/auth/authSlice.js'
import { registerSchema } from '../../features/auth/authSchemas.js'
import { register as registerUser } from '../../features/auth/authThunks.js'

const AtIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21C16.971 21 21 16.971 21 12C21 7.029 16.971 3 12 3C7.029 3 3 7.029 3 12C3 16.971 7.029 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 16C10.343 16 9 14.657 9 13C9 11.343 10.343 10 12 10C13.657 10 15 11.343 15 13V13.5C15 14.328 15.672 15 16.5 15V13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const UserIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12C14.209 12 16 10.209 16 8C16 5.791 14.209 4 12 4C9.791 4 8 5.791 8 8C8 10.209 9.791 12 12 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.207 17.999C17.827 15.562 15.118 14 12 14C8.882 14 6.173 15.562 4.793 17.999"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const LockIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 10H7V8C7 5.791 8.791 4 11 4C13.209 4 15 5.791 15 8V9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 10H7C5.895 10 5 10.895 5 12V18C5 19.105 5.895 20 7 20H17C18.105 20 19 19.105 19 18V12C19 10.895 18.105 10 17 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15.5C12.414 15.5 12.75 15.164 12.75 14.75C12.75 14.336 12.414 14 12 14C11.586 14 11.25 14.336 11.25 14.75C11.25 15.164 11.586 15.5 12 15.5Z"
      fill="currentColor"
    />
    <path
      d="M12 15.5V17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const EyeIcon = ({ hidden = false }) => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {hidden ? (
      <>
        <path
          d="M3 3L21 21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.9 16.9C17.098 18.512 14.666 19.5 12 19.5C7.5 19.5 3.731 16.717 2 12C2.704 10.03 3.797 8.311 5.169 6.959"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.999 7C13.961 7 15.617 8.254 16.296 9.999"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.121 12.122C13.949 12.294 13.745 12.431 13.521 12.526C13.297 12.621 13.057 12.672 12.814 12.676C12.571 12.68 12.329 12.637 12.102 12.55C11.875 12.462 11.668 12.332 11.491 12.166C11.315 12 11.174 11.802 11.075 11.58C10.976 11.359 10.921 11.12 10.913 10.877C10.904 10.634 10.943 10.391 11.027 10.162C11.11 9.932 11.237 9.721 11.398 9.541"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <>
        <path
          d="M2 12C3.73 7.283 7.5 4.5 12 4.5C16.5 4.5 20.27 7.283 22 12C20.27 16.717 16.5 19.5 12 19.5C7.5 19.5 3.73 16.717 2 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15.5C13.932 15.5 15.5 13.932 15.5 12C15.5 10.068 13.932 8.5 12 8.5C10.068 8.5 8.5 10.068 8.5 12C8.5 13.932 10.068 15.5 12 15.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
)

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  })

  const { registerStatus, registerError, message } =
    useAppSelector(selectAuth)

  useEffect(() => {
    if (message && registerStatus === 'succeeded') {
      toast.success(message)
      dispatch(resetAuthMessage())
      navigate('/login')
    }
  }, [message, registerStatus, dispatch, navigate])

  useEffect(() => {
    if (registerError) {
      toast.error(registerError)
    }
  }, [registerError])

  const onSubmit = (values) => {
    const { confirm_password: _confirmPassword, ...payload } = values
    dispatch(registerUser(payload))
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center px-6 py-12 sm:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="flex items-center justify-center gap-3">
              <img src={brandLogo} alt="SIMS PPOB" className="h-8 w-8" />
              <span className="text-xl font-semibold text-slate-900">SIMS PPOB</span>
            </div>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Lengkapi data untuk membuat akun
              </h1>
              <p className="text-sm text-slate-500">
                Dapatkan akses ke top up, pembayaran, dan riwayat transaksi dalam satu aplikasi.
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <InputField
                id="email"
                type="email"
                placeholder="Masukkan email anda"
                autoComplete="email"
                error={form.formState.errors.email?.message}
                leadingIcon={<AtIcon />}
                {...form.register('email')}
              />
              <InputField
                id="first_name"
                placeholder="Nama depan"
                autoComplete="given-name"
                error={form.formState.errors.first_name?.message}
                leadingIcon={<UserIcon />}
                {...form.register('first_name')}
              />
              <InputField
                id="last_name"
                placeholder="Nama belakang"
                autoComplete="family-name"
                error={form.formState.errors.last_name?.message}
                leadingIcon={<UserIcon />}
                {...form.register('last_name')}
              />

              <InputField
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Buat password"
                autoComplete="new-password"
                error={form.formState.errors.password?.message}
                leadingIcon={<LockIcon />}
                trailingIcon={(
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    <EyeIcon hidden={showPassword} />
                  </button>
                )}
                {...form.register('password')}
              />
              <InputField
                id="confirm_password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Konfirmasi password"
                autoComplete="new-password"
                error={form.formState.errors.confirm_password?.message}
                leadingIcon={<LockIcon />}
                trailingIcon={(
                  <button
                    type="button"
                    onClick={toggleConfirmVisibility}
                    className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi password' : 'Lihat konfirmasi password'}
                  >
                    <EyeIcon hidden={showConfirmPassword} />
                  </button>
                )}
                {...form.register('confirm_password')}
              />
              <Button type="submit" isLoading={registerStatus === 'loading'}>
                Registrasi
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500">
              Sudah punya akun? login{' '}
              <Link
                to="/login"
                className="font-semibold text-brand-600 hover:text-brand-500"
              >
                di sini
              </Link>
            </p>
          </div>
        </div>

        <div className="relative hidden overflow-hidden bg-rose-50 lg:flex">
          <img
            src={authIllustration}
            alt="Ilustrasi registrasi SIMS PPOB"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
