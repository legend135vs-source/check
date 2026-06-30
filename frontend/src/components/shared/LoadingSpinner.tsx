import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface Props {
  className?: string
  size?: number
}

export function LoadingSpinner({ className, size = 32 }: Props) {
  return (
    <Loader2
      className={cn('animate-spin text-primary', className)}
      width={size}
      height={size}
    />
  )
}
