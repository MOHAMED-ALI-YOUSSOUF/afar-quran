import { groq } from 'next-sanity'
import AudiosClient from '@/components/AudiosClient'
import { client } from '@/sanity/lib/client'

async function getAllPages() {
  return client.fetch(groq`
    *[_type == "audio"] | order(pageNumber asc) {
      _id,
      pageNumber,
      surahName,
      quranText,
      "audioUrl": audioFile.asset->url
    }
  `)
}

export default async function AudiosList() {
  const pages = await getAllPages()

  return <AudiosClient pages={pages} />
}