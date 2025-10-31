import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import AudioPageClient from '@/components/AudioPageClient'
import { client } from '@/sanity/lib/client'

interface PageProps {
  params: Promise<{ pageNumber: string }>
}

async function getPage(page: number) {
  return client.fetch(
    groq`*[_type == "audio" && pageNumber == $page][0] {
      _id,
      pageNumber,
      surahName,
      quranText,
      "audioUrl": audioFile.asset->url
    }`,
    { page }
  )
}

export async function generateStaticParams() {
  const pages = await client.fetch(groq`*[_type == "audio"] { pageNumber }`)
  return pages.map((p: any) => ({ pageNumber: p.pageNumber.toString() }))
}

export default async function AudioPage({ params }: PageProps) {
  const { pageNumber: raw } = await params
  const pageNumber = parseInt(raw, 10)
  if (isNaN(pageNumber)) notFound()

  const page = await getPage(pageNumber)
  if (!page) notFound()

  return <AudioPageClient page={page} />
}