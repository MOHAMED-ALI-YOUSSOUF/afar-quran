'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
      <Input
        type="number"
        placeholder="ابحث عن رقم الصفحة..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10 text-right"
        min="1"
        max="604"
      />
    </div>
  )
}