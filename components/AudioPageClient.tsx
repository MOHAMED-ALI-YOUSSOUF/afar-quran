'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import AudioPlayer from '@/components/AudioPlayer'
import { toast } from 'sonner'
import PageScrollNav from './PageScrollNav'
import FloatingPlayer from './FloatingPlayer'
import Footer from './Footer'

interface AudioPageClientProps {
  page: {
    pageNumber: number
    surahName: string
    quranText: string
    audioUrl: string

  }
}

export default function AudioPageClient({ page }: AudioPageClientProps) {
  const [isListened, setIsListened] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('listenedPages')
    const listened = stored ? new Set(JSON.parse(stored)) : new Set()
    setIsListened(listened.has(page.pageNumber))
  }, [page.pageNumber])

  const toggleListened = () => {
    const stored = localStorage.getItem('listenedPages')
    const listened = stored ? new Set(JSON.parse(stored)) : new Set()

    if (listened.has(page.pageNumber)) {
      listened.delete(page.pageNumber)
      setIsListened(false)
       toast.error("تم الإلغاء ❌", {
      description: "تم إلغاء تحديد الصفحة",
      duration: 3000,
    })
    } else {
      listened.add(page.pageNumber)
      setIsListened(true)
      toast.success("تم الحفظ ✅", {
      description: "تم تحديد الصفحة كمستمعة",
      duration: 3000,
    })
    }

    localStorage.setItem('listenedPages', JSON.stringify([...listened]))
  }

  return (
   <div className="min-h-screen bg-slate-950">
  {/* Barre de navigation horizontale */}
  <PageScrollNav currentPage={page.pageNumber} totalPages={604} surahName={page.surahName} />

  {/* Contenu principal */}
  <div className="py-8 px-4">
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/audios">
          <Button variant="outline" className="gap-2">
            <ArrowRight className="w-4 h-4" />
            رجوع
          </Button>
        </Link>
        <h1 className="hidden lg:block text-3xl font-bold text-amber-400">
          الصفحة {page.pageNumber} - {page.surahName}
        </h1>
        <Button
          variant={isListened ? 'default' : 'outline'}
          onClick={toggleListened}
          className="gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          {isListened ? 'تم الاستماع' : 'تحديد كمستمع'}
        </Button>
      </div>

      <h1 className="lg:hidden text-3xl font-bold text-amber-400 text-center">
        الصفحة {page.pageNumber} - {page.surahName}
      </h1>

      {/* Quran Text - Scrollable */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 md:p-8 h-[50vh] md:h-[60vh] overflow-y-auto shadow-inner scrollable-quran">
        <p className="text-2xl md:text-3xl leading-loose text-right whitespace-pre-line text-amber-100 font-['Amiri_Quran'] tracking-wide">
          {page.quranText}
        </p>
      </div>

      {/* Audio Player */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center text-amber-400">
          استمع إلى التفسير
        </h2>
        <AudioPlayer audioUrl={page.audioUrl} pageNumber={page.pageNumber} surahName={page.surahName} />
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-center">
        {page.pageNumber > 1 && (
          <Link href={`/audios/${page.pageNumber - 1}`}>
            <Button variant="outline" className="w-32">السابقة</Button>
          </Link>
        )}
        {page.pageNumber < 604 && (
          <Link href={`/audios/${page.pageNumber + 1}`}>
            <Button variant="outline" className="w-32">التالية</Button>
          </Link>
        )}
      </div>
    </div>
  </div>

   
</div>
  )
}