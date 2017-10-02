import Projects from '../../../collections/projects'

Meteor.methods({
  removeProject (project) {
    check(project, Object)

    const projectId = project._id
    delete project._id

    Projects.remove(projectId)
  }
})
