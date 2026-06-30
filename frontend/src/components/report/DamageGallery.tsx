'use client'

import type { PhotoAnalysis } from '@/types/report.types'
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'

interface Props { analyses: PhotoAnalysis[] }

export function DamageGallery({ analyses }: Props) {
  const [selected, setSelected] = useState<PhotoAnalysis | null>(null)

  return (
    <section>
      <h2 className="font-semibold text-lg mb-3">Аналіз фотографій</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {analyses.map((a, i) => (
          <button
            key={i}
            onClick={() => setSelected(a)}
            className={cn(
              'relative aspect-square rounded-xl overflow-hidden border-2 transition-colors',
              a.damage_detected ? 'border-destructive/50' : 'border-transparent'
            )}
          >
            <Image src={a.photo_url} alt={`Photo ${i + 1}`} fill className="object-cover" />
            {a.damage_detected && (
              <div className="absolute bottom-0 inset-x-0 bg-destructive/80 text-destructive-foreground text-xs px-2 py-1">
                Пошкодження
              </div>
            )}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 border rounded-xl p-4 bg-muted/30">
          <p className="text-sm font-medium mb-1">Деталі аналізу</p>
          {selected.damage_description && <p className="text-sm text-muted-foreground">{selected.damage_description}</p>}
          {selected.damage_zones.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selected.damage_zones.map((z) => (
                <span key={z} className="text-xs bg-destructive/10 text-destructive rounded px-2 py-0.5">{z}</span>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Впевненість: {Math.round(selected.confidence_score * 100)}%
          </p>
        </div>
      )}
    </section>
  )
}
