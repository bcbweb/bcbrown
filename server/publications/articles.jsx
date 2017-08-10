import Articles from '../../collections/articles';

Meteor.publish('allArticles', () => Articles.find());
Meteor.publish('singleArticle', (slug) => {
  check(slug, String);

  return Articles.find({ slug });
});
Meteor.publish('articleEditor', (_id) => {
  check(_id, String);

  return Articles.find({ _id });
});
