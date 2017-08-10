import Projects from '../../collections/projects';

Meteor.publish('allProjects', () => Projects.find());
Meteor.publish('singleProject', (slug) => {
  check(slug, String);

  return Projects.find({ slug });
});
Meteor.publish('projectEditor', (_id) => {
  check(_id, String);

  return Projects.find({ _id });
});
