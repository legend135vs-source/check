'use client'

import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

interface Props {
  title: string
  fetchFn: () => Promise<Record<string, unknown>[]>
  columns: string[]
}

export function CrudTable({ title, fetchFn, columns }: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFn().then(setRows).finally(() => setLoading(false))
  }, [fetchFn])

  if (loading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>

  return (
    <div>
      <h2 className="font-semibold text-base mb-3">{title}</h2>
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((col) => (
                <th key={col} className="text-left px-4 py-2 font-medium text-muted-foreground capitalize">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-t hover:bg-muted/20">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 max-w-[300px] truncate">
                    {String(row[col] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                  Записів немає
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
