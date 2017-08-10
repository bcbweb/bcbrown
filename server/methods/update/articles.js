import Articles from '../../../collections/articles';

Meteor.methods({
  saveArticle(article) {
    check(article, Object);

    const articleId = article._id;
    delete article._id;

    Articles.upsert(articleId, { $set: article });
  }
});
