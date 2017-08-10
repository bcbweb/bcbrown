import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Projects = new Mongo.Collection('projects');

Projects.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Projects.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

const ProjectsSchema = new SimpleSchema({
  description: {
    type: String,
    label: 'A description of the project.',
    optional: true
  },
  featuredImageUrl: {
    type: String,
    label: 'URL for featured image',
    optional: true
  },
  slug: {
    type: String,
    label: 'The slug for this project.',
    autoValue() {
      const slug              = this.value;
      const existingSlugCount = Projects.find(
        { _id: { $ne: this.docId }, slug: new RegExp(slug) }
      ).count();
      const existingUntitled  = Projects.find(
        { slug: { $regex: /untitled-project/i } }
      ).count();

      if (slug) {
        if (existingSlugCount > 0) {
          return `${slug}-${existingSlugCount + 1}`;
        }
        return slug;
      }

      if (existingUntitled > 0) {
        return `untitled-project-${existingUntitled + 1}`;
      }
      return 'untitled-project';
    }
  },
  standfirst: {
    type: String,
    label: 'Standfirst for this project.',
    optional: true
  },
  tags: {
    type: [String],
    label: 'The tags for this project.',
    optional: true
  },
  title: {
    type: String,
    label: 'The title of this project.',
    defaultValue: 'Untitled Project'
  },
  updated: {
    type: String,
    label: 'The date this project was last updated on.',
    autoValue() {
      return (new Date()).toISOString();
    }
  }
});

Projects.attachSchema(ProjectsSchema);

export default Projects;
