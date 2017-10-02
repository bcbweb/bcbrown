import Articles from '../../../collections/articles'

Meteor.methods({
  removeArticle (article) {
    check(article, Object)

    const articleId = article._id
    delete article._id

    Articles.remove(articleId)
  }
})
