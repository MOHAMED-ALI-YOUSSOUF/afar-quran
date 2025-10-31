'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface FloatingPlayerProps {
  audioUrl: string
  pageNumber: number
  surahName?: string
}

export default function FloatingPlayer({ audioUrl, pageNumber, surahName }: FloatingPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const update = () => setProgress((audio.currentTime / audio.duration) * 100 || 0)
    audio.addEventListener('timeupdate', update)
    return () => audio.removeEventListener('timeupdate', update)
  }, [audioUrl])

  const toggle = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current?.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={audioUrl} />

      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 shadow-2xl z-50">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/audios/${pageNumber}`} className="block">
              <p className="font-medium text-amber-400 truncate">
                الصفحة {pageNumber} {surahName && `— ${surahName}`}
              </p>
            </Link>
            <div className="h-1 bg-slate-700 rounded-full mt-1">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Contrôles */}
          <div className="flex items-center gap-2">
            <Link href={`/audios/${Math.max(1, pageNumber - 1)}`}>
              <Button size="icon" variant="ghost">
                <SkipBack className="w-5 h-5" />
              </Button>
            </Link>

            <Button
              size="icon"
              className="bg-amber-600 hover:bg-amber-700 w-12 h-12"
              onClick={toggle}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>

            <Link href={`/audios/${Math.min(604, pageNumber + 1)}`}>
              <Button size="icon" variant="ghost">
                <SkipForward className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}