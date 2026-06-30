import { z } from 'zod'
import { MAX_PHOTO_SIZE_MB, MAX_PHOTOS } from '@/lib/utils/constants'

export const photoUploadSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, 'Завантажте хоча б одне фото')
    .max(MAX_PHOTOS, `Максимум ${MAX_PHOTOS} фотографій`)
    .refine(
      (files) => files.every((f) => f.size <= MAX_PHOTO_SIZE_MB * 1024 * 1024),
      `Кожен файл не більше ${MAX_PHOTO_SIZE_MB} МБ`
    ),
})
