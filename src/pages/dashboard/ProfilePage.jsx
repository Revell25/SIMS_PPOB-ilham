import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks.js'
import InputField from '../../components/form/InputField.jsx'
import Button from '../../components/ui/Button.jsx'
import {
  resetProfileMessage,
  selectProfile,
  selectProfileMessage,
  selectProfileStatus,
} from '../../features/profile/profileSlice.js'
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from '../../features/profile/profileThunks.js'
import { profileSchema } from '../../features/profile/profileSchema.js'
import defaultAvatar from '../../assets/profile-default.png'
import { logout } from '../../features/auth/authThunks.js'

const MAX_IMAGE_SIZE = 100 * 1024

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const fileInputRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  const profile = useAppSelector(selectProfile)
  const profileStatus = useAppSelector(selectProfileStatus)
  const {
    updateStatus,
    updateError,
    imageStatus,
    imageError,
  } = useAppSelector((state) => state.profile)
  const profileMessage = useAppSelector(selectProfileMessage)

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profile?.first_name ?? '',
      last_name: profile?.last_name ?? '',
    },
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name ?? '',
        last_name: profile.last_name ?? '',
      })
    }
  }, [profile, form])

  useEffect(() => {
    if (profileMessage) {
      toast.success(profileMessage)
      dispatch(resetProfileMessage())
    }
  }, [profileMessage, dispatch])

  useEffect(() => {
    if (updateError) {
      toast.error(updateError)
    }
  }, [updateError])

  useEffect(() => {
    if (imageError) {
      toast.error(imageError)
    }
  }, [imageError])

  const onSubmit = async (values) => {
    try {
      await dispatch(updateProfile(values)).unwrap()
      await dispatch(fetchProfile())
      setIsEditing(false)
    } catch (error) {
      // error toast already handled in slice; keep edit mode active
    }
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Format gambar harus JPEG atau PNG')
      event.target.value = ''
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error('Ukuran gambar maksimal 100KB')
      event.target.value = ''
      return
    }

    await dispatch(updateProfileImage(file))
    dispatch(fetchProfile())
    event.target.value = ''
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleStartEdit = () => {
    setIsEditing(true)
    setTimeout(() => {
      form.setFocus('first_name')
    }, 0)
  }

  const handleCancelEdit = () => {
    if (profile) {
      form.reset({
        first_name: profile.first_name ?? '',
        last_name: profile.last_name ?? '',
      })
    }
    setIsEditing(false)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const profileImageSrc = useMemo(() => {
    const src = profile?.profile_image?.trim()
    if (!src || src.toLowerCase() === 'null' || src.toLowerCase() === 'undefined' || src.endsWith('/null')) {
      return defaultAvatar
    }
    return src
  }, [profile?.profile_image])

  const displayName = useMemo(() => {
    if (!profile) return 'Pengguna'
    const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ')
    return name || 'Pengguna'
  }, [profile])

  if (profileStatus === 'loading' && !profile) {
    return (
      <div className="space-y-4">
        <div className="h-44 animate-pulse rounded-3xl bg-slate-100" />
        <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <div className="relative mx-auto flex w-fit flex-col items-center">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
            <img
              src={profileImageSrc}
              alt={displayName}
              className="h-full w-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleUploadClick}
            className="absolute bottom-0 right-0 flex h-9 w-9 translate-x-4 translate-y-2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition hover:bg-slate-50"
            aria-label="Ubah foto profil"
          >
            {imageStatus === 'loading' ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 7.5L6 5h3l1.5-2h3L15 5h3l2.5 2.5v11a1.5 1.5 0 01-1.5 1.5h-12A1.5 1.5 0 015 18.5v-11z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="mt-6 space-y-1">
          <h2 className="text-2xl font-semibold text-slate-900">{displayName}</h2>
          <p className="text-sm text-slate-500">{profile?.email ?? '—'}</p>
        </div>

        <form
          className="mx-auto mt-8 w-full max-w-md space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <InputField
            id="email"
            label="Email"
            type="email"
            value={profile?.email ?? ''}
            disabled
            readOnly
            inputClassName="bg-slate-50 cursor-not-allowed"
          />
          <InputField
            id="first_name"
            label="Nama Depan"
            placeholder="Nama depan"
            disabled={!isEditing}
            inputClassName={!isEditing ? 'bg-slate-50 cursor-not-allowed' : ''}
            error={form.formState.errors.first_name?.message}
            {...form.register('first_name')}
          />
          <InputField
            id="last_name"
            label="Nama Belakang"
            placeholder="Nama belakang"
            disabled={!isEditing}
            inputClassName={!isEditing ? 'bg-slate-50 cursor-not-allowed' : ''}
            error={form.formState.errors.last_name?.message}
            {...form.register('last_name')}
          />
          {isEditing && (
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                isLoading={updateStatus === 'loading'}
                className="flex-1"
              >
                Simpan
              </Button>
              <Button
                type="button"
                onClick={handleCancelEdit}
                variant="secondary"
                className="flex-1"
                disabled={updateStatus === 'loading'}
              >
                Batalkan
              </Button>
            </div>
          )}
        </form>

        {!isEditing && (
          <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3">
            <Button
              type="button"
              onClick={handleStartEdit}
              variant="ghost"
              className="w-full border border-brand-500 text-brand-600 hover:bg-brand-50"
            >
              Edit Profile
            </Button>
            <Button
              type="button"
              onClick={handleLogout}
              className="w-full"
              isLoading={profileStatus === 'loading'}
            >
              Logout
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}

export default ProfilePage
