'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import QuranPageCard from '@/components/QuranPageCard'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

interface Page {
  _id: string
  pageNumber: number
  surahName: string
  quranText: string
  audioUrl: string
}

interface AudiosClientProps {
  pages: Page[]
}

export default function AudiosClient({ pages }: AudiosClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [listenedPages, setListenedPages] = useState<Set<number>>(new Set())

  useEffect(() => {
    const stored = localStorage.getItem('listenedPages')
    if (stored) {
      setListenedPages(new Set(JSON.parse(stored)))
    }
  }, [])

  const filteredPages = pages.filter(page =>
    searchTerm === '' || page.pageNumber.toString().includes(searchTerm)
  )

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
            تفسير القرآن الكريم
          </h1>
          <p className="text-xl text-slate-400">شرح الشيخ حمد بلغة العفر</p>
        </div>
          

     {/* Search + Retour */}
        <div className="flex items-center gap-2">
        
          <Link href="/">
            <Button variant="outline" className="gap-2 shrink-0">
              <ArrowRight className="w-4 h-4" />
              رجوع
            </Button>
          </Link>
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm} 
            className="flex-1" // prend tout l'espace disponible
          />
        </div>


        {/* Pages List */}
        <div className="mt-6">
        {filteredPages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2  gap-4">
            {filteredPages.map((page) => (
                <QuranPageCard
                key={page._id}
                pageNumber={page.pageNumber}
                isListened={listenedPages.has(page.pageNumber)}
                surahName={page.surahName}
                />
            ))}
            </div>
        ) : (
            <div className="text-center py-12">
            <p className="text-slate-400 text-lg">لم يتم العثور على صفحات</p>
            </div>
        )}
        </div>

      </div>
    </div>
  )
}