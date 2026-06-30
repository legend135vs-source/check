'use client'

import { useState } from 'react'
import { StatsPanel } from './StatsPanel'
import { CrudTable } from './CrudTable'
import { listBrands, createBrand, listPrompts } from '@/lib/api/admin.api'

const TABS = ['Статистика', 'Бренди', 'AI Промпти'] as const
type Tab = typeof TABS[number]

export function AdminLayout() {
  const [tab, setTab] = useState<Tab>('Статистика')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="font-bold text-lg">Admin Panel</h1>
        <p className="text-xs text-muted-foreground">AI Vehicle Inspector</p>
      </header>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Статистика' && <StatsPanel />}
        {tab === 'Бренди' && (
          <CrudTable
            title="Бренди"
            fetchFn={listBrands}
            columns={['name', 'country']}
          />
        )}
        {tab === 'AI Промпти' && (
          <CrudTable
            title="AI Промпти"
            fetchFn={listPrompts}
            columns={['key', 'description', 'template']}
          />
        )}
      </div>
    </div>
  )
}
