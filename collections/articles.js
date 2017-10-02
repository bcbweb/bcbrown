import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Articles = new Mongo.Collection('articles')

Articles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
})

Articles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})

const ArticlesSchema = new SimpleSchema({
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
    label: 'The content of this post in markdown',
    optional: true
  },
  parsedContent: {
    type: String,
    label: 'The content of this post parsed as HTML',
    optional: true
  },
  published: {
    type: Boolean,
    label: 'Is this post published?',
    defaultValue: false
  },
  created: {
    type: String,
    label: 'The date this post was created on.',
    autoValue () {
      return (new Date()).toISOString()
    }
  },
  date: {
    type: String,
    label: 'The date this post was created.',
    autoValue () {
      return (new Date()).toISOString()
    }
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
      const existingSlugCount = Articles.find(
        { _id: { $ne: this.docId }, slug: new RegExp(slug) }
      ).count()
      const existingUntitled = Articles.find(
        { slug: { $regex: /untitled-article/i } }
      ).count()

      if (slug) {
        if (existingSlugCount > 0) {
          return `${slug}-${existingSlugCount + 1}`
        }
        return slug
      }

      if (existingUntitled > 0) {
        return `untitled-article-${existingUntitled + 1}`
      }
      return 'untitled-article'
    }
  },
  standfirst: {
    type: String,
    label: 'Standfirst for this post.',
    optional: true
  },
  tags: {
    type: [String],
    label: 'The tags for this post.',
    optional: true
  },
  title: {
    type: String,
    label: 'The title of this post.',
    defaultValue: 'Untitled Article'
  }
})

Articles.attachSchema(ArticlesSchema)

export default Articles
