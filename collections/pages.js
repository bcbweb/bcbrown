import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Pages = new Mongo.Collection('pages')

Pages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
})

Pages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})

const PagesSchema = new SimpleSchema({
  author: {
    type: String,
    label: 'The ID of the author of this post.',
    autoValue () {
      const user = Meteor.users.findOne({ _id: this.userId })
      if (user) return user._id
      return false
    }
  },
  content: {
    type: String,
    label: 'The content of this post.',
    optional: true
  },
  published: {
    type: Boolean,
    label: 'Is this post published?',
    defaultValue: false
  },
  mainMenuItem: {
    type: Boolean,
    label: 'Show this post in the main menu?',
    defaultValue: false
  },
  order: {
    type: Number,
    label: 'Priority (order in menu)',
    defaultValue: 0
  },
  updated: {
    type: String,
    label: 'The date this post was last updated on.',
    autoValue () {
      return (new Date()).toISOString()
    }
  },
  slug: {
    type: String,
    label: 'The slug for this post.',
    autoValue () {
      const slug = this.value
      const existingSlugCount = Pages.find(
        { _id: { $ne: this.docId }, slug: new RegExp(slug) }
      ).count()
      const existingUntitled = Pages.find(
        { slug: { $regex: /untitled-page/i } }
      ).count()

      if (slug) {
        if (existingSlugCount > 0) {
          return `${slug}-${existingSlugCount + 1}`
        }
        return slug
      }

      if (existingUntitled > 0) {
        return `untitled-page-${existingUntitled + 1}`
      }
      return 'untitled-page'
    }
  },
  standfirst: {
    type: String,
    label: 'Standfirst for this page.',
    optional: true
  },
  tags: {
    type: [String],
    label: 'The tags for this page.',
    optional: true
  },
  title: {
    type: String,
    label: 'The title of this page.',
    defaultValue: 'Untitled Page'
  }
})

Pages.attachSchema(PagesSchema)

export default Pages
