import Pages from '../../collections/pages';

Meteor.publish('allPages', () => Pages.find());
Meteor.publish('singlePage', (slug) => {
  check(slug, String);

  return Pages.find({ slug });
});
Meteor.publish('pageEditor', (_id) => {
  check(_id, String);

  return Pages.find({ _id });
});
