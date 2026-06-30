'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { reportFormSchema, type ReportFormValues } from '@/lib/validators/report.schema'
import { createReport } from '@/lib/api/report.api'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export function VehicleInputForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
  })

  async function onSubmit(values: ReportFormValues) {
    setLoading(true)
    setApiError(null)
    try {
      const report = await createReport(values)
      router.push(`/report/${report.id}`)
    } catch (e: unknown) {
      setApiError(e instanceof Error ? e.message : 'Помилка сервера')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded-2xl shadow-sm p-6 text-left space-y-4 max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="vin">VIN-код</label>
        <input
          id="vin"
          {...register('vin')}
          placeholder="Наприклад: 1HGCM82633A004352"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.vin && <p className="text-destructive text-xs mt-1">{errors.vin.message}</p>}
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-border" />
        або
        <div className="flex-1 h-px bg-border" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="auto_ria_url">Посилання Auto.ria</label>
        <input
          id="auto_ria_url"
          {...register('auto_ria_url')}
          placeholder="https://auto.ria.com/auto_..."
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.auto_ria_url && <p className="text-destructive text-xs mt-1">{errors.auto_ria_url.message}</p>}
      </div>

      {apiError && <p className="text-destructive text-sm">{apiError}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? <><LoadingSpinner size={16} /> Генерація…</> : 'Отримати звіт'}
      </button>
    </form>
  )
}
