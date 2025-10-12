import { z } from 'zod'

export const topUpSchema = z.object({
  amount: z
    .preprocess(
      (value) =>
        typeof value === 'string' ? Number(value.replace(/\D/g, '')) : value,
      z
        .number({
          required_error: 'Nominal top up wajib diisi',
          invalid_type_error: 'Nominal harus berupa angka',
        })
        .min(10000, 'Minimal top up Rp10.000')
        .max(1000000, 'Maksimal top up Rp1.000.000'),
    ),
})
