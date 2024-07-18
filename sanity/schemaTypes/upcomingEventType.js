import {defineField, defineType} from 'sanity'

export const upcomingEventType = defineType({
  name: 'upcomingEvent',
  title: 'Upcoming Event',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'GuessedDate',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
