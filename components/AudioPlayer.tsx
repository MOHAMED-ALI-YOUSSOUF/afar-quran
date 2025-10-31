'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useState } from 'react'

interface AudioPlayerProps {
  audioUrl: string
  pageNumber: number
  surahName: string
}

export default function AudioPlayer({ audioUrl, pageNumber , surahName}: AudioPlayerProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (isDownloading) return
    setIsDownloading(true)

    try {
      const response = await fetch(audioUrl)
      if (!response.ok) throw new Error('Failed to fetch audio')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${surahName}_${pageNumber}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      alert('فشل التحميل، حاول مرة أخرى')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="w-full space-y-4">
      {/* Audio Player */}
      <audio
        controls
        className="w-full rounded-lg bg-slate-800"
        style={{ filter: 'hue-rotate(0deg)' }}
      >
        <source src={audioUrl} type="audio/mpeg" />
        متصفحك لا يدعم عنصر الصوت.
      </audio>

      {/* Download Button */}
      <Button
        onClick={handleDownload}
        variant="outline"
        className="w-full gap-2"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="60"
                strokeDashoffset="30"
                className="opacity-25"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray="60"
                strokeDashoffset="15"
                className="opacity-75"
              />
            </svg>
            جاري التحميل...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            تحميل التفسير
          </>
        )}
      </Button>
    </div>
  )
}