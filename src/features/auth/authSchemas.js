import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email wajib diisi' })
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid')
    .transform((value) => value.trim()),
  password: z
    .string({ required_error: 'Password wajib diisi' })
    .min(8, 'Password minimal 8 karakter'),
})

export const registerSchema = loginSchema
  .extend({
    first_name: z
      .string({ required_error: 'Nama depan wajib diisi' })
      .min(1, 'Nama depan wajib diisi')
      .transform((value) => value.trim()),
    last_name: z
      .string({ required_error: 'Nama belakang wajib diisi' })
      .min(1, 'Nama belakang wajib diisi')
      .transform((value) => value.trim()),
    confirm_password: z
      .string({ required_error: 'Konfirmasi password wajib diisi' })
      .min(8, 'Konfirmasi password minimal 8 karakter'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        path: ['confirm_password'],
        code: z.ZodIssueCode.custom,
        message: 'Konfirmasi password tidak sama',
      })
    }
  })
