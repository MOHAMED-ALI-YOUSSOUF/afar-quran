import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, BookOpen, Mic } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-5  px-4">
      {/* Hero */}
    
      <div className=" text-center space-y-6 max-w-2xl">
          <div className="w-20 h-20 mx-auto bg-primary/30 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-10 h-10 text-amber-400" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-primary leading-relaxed">
            تفسير الشيخ حمد
          </h1>
          
          <div className="h-1 w-38 bg-amber-400 mx-auto rounded-full"></div>

           <p className="text-xl text-slate-300 leading-relaxed">
          استمع إلى تفسير القرآن الكريم كاملاً بلغة العفر<br />
          مع الشيخ حمد رحمه الله
        </p>
        </div>

      {/* Cheikh Card */}
      <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-slate-700 border-2 border-dashed border-slate-600 rounded-full w-32 h-32" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-amber-400">الشيخ حمد</h2>
            <p className="text-slate-400">عالم وداعية من جيبوتي</p>
          </div>
          <Link href="/audios" className="w-full">
            <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-lg">
              <Play className="ml-2 h-5 w-5" />
              ابدأ الاستماع
            </Button>
          </Link>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-3xl font-bold text-amber-400">604</div>
          <div className="text-sm text-slate-500">صفحة</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-amber-400">114</div>
          <div className="text-sm text-slate-500">سورة</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-amber-400">عفر</div>
          <div className="text-sm text-slate-500">اللغة</div>
        </div>
      </div>
    </div>
  )
}