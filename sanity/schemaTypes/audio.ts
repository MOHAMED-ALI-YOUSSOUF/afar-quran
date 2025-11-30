import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export default defineType({
  name: 'audio',
  title: 'Tafsir Page',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'pageNumber',
      title: 'Numéro de page',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(604).integer(),
    }),
    defineField({
      name: 'surahName',
      title: 'Nom de la sourate (optionnel)',
      type: 'string',
    }),
    defineField({
      name: 'quranText',
      title: 'Texte du Coran (arabe)',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio Tafsir (en Afar)',
      type: 'file',
      options: { accept: 'audio/*,audio/mp4,.m4a'
 },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      page: 'pageNumber',
      surah: 'surahName',
    },
    prepare({ page, surah }) {
      return {
        title: `Page ${page}`,
        subtitle: surah ? `— ${surah}` : 'Tafsir Cheikh Hamad',
        media: PlayIcon,
      }
    },
  },
  orderings: [
    {
      title: 'Par numéro de page',
      name: 'pageAsc',
      by: [{ field: 'pageNumber', direction: 'asc' }],
    },
  ],
})