import { groq } from 'next-sanity'
import { client } from './client'

export async function getAllPages() {
  return client.fetch(groq`*[_type == "audio"] | order(pageNumber asc) {
    _id,
    pageNumber,
    surahName,
    quranText,
    "audioUrl": audioFile.asset->url
  }`)
}

export async function getPageByNumber(page: number) {
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