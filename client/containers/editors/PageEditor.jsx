import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import { getSlug } from 'meteor/ongoworks:speakingurl';

import Pages from '../../../collections/pages';
import { getValue, isChecked, setValue } from '../../helpers/react';

import Form from '../../components/forms/Form.jsx';
import FormGroup from '../../components/forms/FormGroup.jsx';
import FormControl from '../../components/forms/FormControl.jsx';
import SuccessButton from '../../components/buttons/SuccessButton.jsx';
import Loading from '../../components/global/Loading.jsx';

class PageEditor extends Component {
  validations() {
    const component = this;

    return {
      rules: {
        pageTitle: {
          required: true
        }
      },
      messages: {
        pageTitle: {
          required: 'A page title is required!'
        }
      },
      submitHandler() {
        const form = component.refs.editPageForm.refs.form;
        const page = {
          content: getValue(form, '[name="pageContent"]'),
          published: isChecked(form, '[name="pagePublished"]'),
          mainMenuItem: isChecked(form, '[name="pageMainMenuItem"]'),
          order: getValue(form, '[name="pageOrder"]'),
          slug: getValue(form, '[name="pageSlug"]'),
          standfirst: getValue(form, '[name="pageStandfirst"]'),
          tags: getValue(form, '[name="pageTags"]')
            .split(',')
            .map(string => string.trim()),
          title: getValue(form, '[name="pageTitle"]')
        };

        if (! component.props.newPage) page._id = component.props.pageId;

        Meteor.call('savePage', page, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert(
              `Page  ${component.props.newPage ? 'added' : 'saved'}!`,
              'success'
            );
          }
        });
      }
    };
  }

  generateSlug(event) {
    const form         = this.refs.editPageForm.refs.form;
    const title        = event.target.value;

    setValue(
      form,
      '[name="pageSlug"]',
      getSlug(title, { custom: { "'": '' } })
    );
  }

  static handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    if (! this.props.ready) return <Loading/>;

    const page = this.props.page;

    return <section className="page-content editor">
      <Form
        ref="editPageForm"
        id="edit-page"
        className="edit-page"
        validations={ this.validations() }
        onSubmit={ this.handleSubmit }
      >
        <FormGroup>
          <FormControl
            style="checkbox"
            name="pagePublished"
            label="Published?"
            defaultValue={ page && page.published }
          />
          <FormControl
            style="checkbox"
            name="pageMainMenuItem"
            label="Is this a main menu page?"
            defaultValue={ page && page.mainMenuItem }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="input"
            type="text"
            name="pageTitle"
            label="Title"
            onChange={ this.generateSlug }
            defaultValue={ page && page.title }
          />
          <FormControl
            showLabel={ false }
            style="input"
            type="text"
            name="pageOrder"
            small={ true }
            label="Priority (order in menu)"
            defaultValue={ page && page.order }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            disabled={ true }
            showLabel={ false }
            style="input"
            type="text"
            name="pageSlug"
            label="Slug"
            defaultValue={ page && page.slug }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="textarea"
            name="pageStandfirst"
            label="Standfirst"
            defaultValue={ page && page.standfirst }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="textarea"
            name="pageContent"
            label="Content"
            defaultValue={ page && page.content }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="input"
            type="text"
            name="pageTags"
            label="Tags"
            defaultValue={ page && page.tags }
          />
        </FormGroup>
        <FormGroup>
          <SuccessButton
            type="submit"
            label={ this.props.newPage ? 'Add page' : 'Save page' }
          />
         </FormGroup>
      </Form>
    </section>;
  }
}

PageEditor.propTypes = {
  page: PropTypes.object,
  ready: PropTypes.bool
};

export default createContainer((params) => {
  const pageId = params.pageId || '';
  const subscription = Meteor.subscribe('pageEditor', pageId);

  return {
    page: Pages.findOne({ _id: pageId }),
    ready: subscription.ready()
  };
}, PageEditor);
