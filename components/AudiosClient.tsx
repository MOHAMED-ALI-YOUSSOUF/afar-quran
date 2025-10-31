'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import QuranPageCard from '@/components/QuranPageCard'

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

        {/* Search */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

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