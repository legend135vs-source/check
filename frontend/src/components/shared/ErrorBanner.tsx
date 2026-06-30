import { AlertTriangle } from 'lucide-react'

interface Props {
  message: string
}

export function ErrorBanner({ message }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl px-6 py-4 max-w-md w-full">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}
