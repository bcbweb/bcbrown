import Projects from '../../../collections/projects';

Meteor.methods({
  saveProject(project) {
    check(project, Object);

    const projectId = project._id;
    delete project._id;

    Projects.upsert(projectId, { $set: project });
  }
});
