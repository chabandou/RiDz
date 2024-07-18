import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  _type: 'reference',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (Rule) => Rule.max(200),
    }),
  ],
})
