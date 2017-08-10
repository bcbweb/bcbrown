import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import { getSlug } from 'meteor/ongoworks:speakingurl';

import Projects from '../../../collections/projects';
import { getValue, setValue } from '../../helpers/react';

import Form from '../../components/forms/Form.jsx';
import FormGroup from '../../components/forms/FormGroup.jsx';
import FormControl from '../../components/forms/FormControl.jsx';
import SuccessButton from '../../components/buttons/SuccessButton.jsx';

class ProjectEditor extends Component {
  validations() {
    const component = this;

    return {
      rules: {
        projectTitle: {
          required: true
        }
      },
      messages: {
        projectTitle: {
          required: 'A project title is required!'
        }
      },
      submitHandler() {
        const form = component.refs.editProjectForm.refs.form;
        const project = {
          description: getValue(form, '[name="projectDescription"]'),
          featuredImageUrl: getValue(form, '[name="projectFeaturedImageUrl"]'),
          slug: getValue(form, '[name="projectSlug"]'),
          standfirst: getValue(form, '[name="projectStandfirst"]'),
          tags: getValue(form, '[name="projectTags"]')
            .split(',')
            .map(string => string.trim()),
          title: getValue(form, '[name="projectTitle"]')
        };

        if (! component.props.newProject) {
          project._id = component.props.projectId;
        }

        if (project.slug === 'add') {
          Bert.alert('The chosen project name is not allowed.', 'danger');

          return;
        }

        Meteor.call('saveProject', project, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert(
              `Project  ${component.props.newProject ? 'added' : 'saved'}!`,
              'success'
            );
          }
        });
      }
    };
  }

  generateSlug(event) {
    const form         = this.refs.editProjectForm.refs.form;
    const title        = event.target.value;

    setValue(
      form,
      '[name="projectSlug"]',
      getSlug(title, { custom: { "'": '' } })
    );
  }

  static handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const project = this.props.project;

    return <section className="page-content editor">
      <Form
        ref="editProjectForm"
        id="edit-project"
        className="edit-project"
        validations={ this.validations() }
        onSubmit={ this.handleSubmit }
      >
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="input"
            type="text"
            name="projectTitle"
            label="Title"
            onChange={ this.generateSlug }
            defaultValue={ project && project.title }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            disabled={ true }
            showLabel={ false }
            style="input"
            type="text"
            name="projectSlug"
            label="Slug"
            defaultValue={ project && project.slug }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="textarea"
            name="projectStandfirst"
            label="Standfirst"
            defaultValue={ project && project.standfirst }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="textarea"
            name="projectDescription"
            label="Description"
            defaultValue={ project && project.description }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="input"
            type="text"
            name="projectFeaturedImageUrl"
            label="Featured Image URL"
            defaultValue={ project && project.featuredImageUrl }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="input"
            type="text"
            name="projectTags"
            label="Tags"
            defaultValue={ project && project.tags }
          />
        </FormGroup>
        <FormGroup>
          <SuccessButton
            type="submit"
            label={ this.props.newProject ? 'Add project' : 'Save project' }
          />
        </FormGroup>
      </Form>
    </section>;
  }
}

ProjectEditor.propTypes = {
  project: PropTypes.object,
  ready: PropTypes.bool
};

export default createContainer((params) => {
  const projectId = params.projectId || '';
  const subscription = Meteor.subscribe('projectEditor', projectId);

  return {
    project: Projects.findOne({ _id: projectId }),
    ready: subscription.ready()
  };
}, ProjectEditor);
