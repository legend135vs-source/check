'use client'

import { useState } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const CHECKLIST_ITEMS = [
  'Перевірити VIN на офіційному сайті виробника',
  'Замовити незалежну діагностику двигуна',
  'Перевірити кузов на наявність прихованих зварювальних швів',
  'Зробити тест-драйв щонайменше 30 хвилин',
  'Перевірити всі електричні системи',
  'Звірити показання одометра з сервісною книжкою',
  'Перевірити наявність рекол-кампаній виробника',
  'Оглянути автомобіль на підйомнику',
  'Перевірити юридичну чистоту ТЗ (реєстрація, застава)',
  'Порівняти ринкову вартість з аналогами',
]

interface Props { riskScore: number }

export function BuyingChecklist({ riskScore }: Props) {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  return (
    <section>
      <h2 className="font-semibold text-lg mb-1">Чек-лист покупця</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {checked.size} з {CHECKLIST_ITEMS.length} пунктів виконано
      </p>
      <div className="space-y-2">
        {CHECKLIST_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="w-full flex items-center gap-3 text-left p-3 rounded-lg border hover:bg-muted/30 transition-colors"
          >
            {checked.has(i)
              ? <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
            }
            <span className={cn('text-sm', checked.has(i) && 'line-through text-muted-foreground')}>
              {item}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
