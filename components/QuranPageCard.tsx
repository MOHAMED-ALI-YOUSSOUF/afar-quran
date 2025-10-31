'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Play, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

interface QuranPageCardProps {
  pageNumber: number
  isListened: boolean
  surahName: string
}

export default function QuranPageCard({ pageNumber, isListened,surahName }: QuranPageCardProps) {
  return (
    <Link href={`/audios/${pageNumber}`}>
      <Card className="cursor-pointer hover:bg-slate-800/50 transition-all duration-300 hover:scale-[1.02] hover:border-amber-600/50">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-600/10 flex items-center justify-center">
              <Play className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">الصفحة رقم {pageNumber} - {surahName}</h3>
              <p className="text-sm text-slate-400">تفسير الشيخ حمد</p>
            </div>
          </div>
          {isListened && <CheckCircle2 className="w-6 h-6 text-amber-600" />}
        </CardContent>
      </Card>
    </Link>
  )
}