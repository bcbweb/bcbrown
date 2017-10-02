import Pages from '../../../collections/pages'

Meteor.methods({
  removePage (page) {
    check(page, Object)

    const pageId = page._id
    delete page._id

    Pages.remove(pageId)
  }
})
