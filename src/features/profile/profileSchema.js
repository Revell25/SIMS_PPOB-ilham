import { z } from 'zod'

export const profileSchema = z.object({
  first_name: z
    .string({ required_error: 'Nama depan wajib diisi' })
    .min(1, 'Nama depan wajib diisi')
    .transform((value) => value.trim()),
  last_name: z
    .string({ required_error: 'Nama belakang wajib diisi' })
    .min(1, 'Nama belakang wajib diisi')
    .transform((value) => value.trim()),
})
