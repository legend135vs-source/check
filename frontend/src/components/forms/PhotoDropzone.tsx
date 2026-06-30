'use client'

import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface Props {
  onFilesChange: (files: File[]) => void
  maxFiles?: number
}

export function PhotoDropzone({ onFilesChange, maxFiles = 20 }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function addFiles(newFiles: File[]) {
    const updated = [...files, ...newFiles].slice(0, maxFiles)
    setFiles(updated)
    onFilesChange(updated)
  }

  function removeFile(index: number) {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
    onFilesChange(updated)
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          addFiles(Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/')))
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
          dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        )}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Перетягніть фото або <span className="text-primary font-medium">натисніть для вибору</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">До {maxFiles} фото, JPG/PNG/WEBP</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => addFiles(Array.from(e.target.files ?? []))}
      />
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-1 bg-muted rounded-lg px-2 py-1 text-xs">
              <span className="max-w-[120px] truncate">{f.name}</span>
              <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
