'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface PageScrollNavProps {
  currentPage: number
  totalPages: number
  surahName:string
}

export default function PageScrollNav({ currentPage, totalPages, surahName }: PageScrollNavProps) {
  const params = useParams()
  const current = parseInt(params.pageNumber as string) || currentPage
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll vers la page actuelle
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const activeEl = container.querySelector(`[data-page="${current}"]`)
    if (activeEl) {
      const containerWidth = container.offsetWidth
      const activeLeft = (activeEl as HTMLElement).offsetLeft
      const activeWidth = (activeEl as HTMLElement).offsetWidth

      container.scrollTo({
        left: activeLeft - containerWidth / 2 + activeWidth / 2,
        behavior: 'smooth',
      })
    }
  }, [current])

  return (
    <div className="w-full overflow-hidden bg-slate-950 border-b border-slate-800">
      <div
        ref={scrollRef}
        className="flex gap-2 py-3 px-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1
          const isActive = page === current

          return (
            <Link
              key={page}
              href={`/audios/${page}`}
              data-page={page}
              className="snap-center flex-shrink-0"
            >
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${isActive
                    ? 'bg-amber-500 text-white scale-110 shadow-lg shadow-amber-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-amber-400'
                  }
                `}
              >
                {page}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}