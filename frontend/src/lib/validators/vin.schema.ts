import { z } from 'zod'

export const vinSchema = z
  .string()
  .length(17, 'VIN має містити рівно 17 символів')
  .regex(/^[A-HJ-NPR-Z0-9]{17}$/, 'VIN містить недійсні символи')
