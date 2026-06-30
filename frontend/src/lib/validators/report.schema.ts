import { z } from 'zod'

export const reportFormSchema = z
  .object({
    vin: z.string().optional(),
    auto_ria_url: z.string().url('Некоректне посилання').optional(),
  })
  .refine((data) => data.vin || data.auto_ria_url, {
    message: 'Введіть VIN або посилання на Auto.ria',
    path: ['vin'],
  })

export type ReportFormValues = z.infer<typeof reportFormSchema>
