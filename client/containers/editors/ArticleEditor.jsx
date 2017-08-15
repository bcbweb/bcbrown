import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import { getSlug } from 'meteor/ongoworks:speakingurl';

import Articles from '../../../collections/articles';
import { getValue, isChecked, setValue } from '../../helpers/react';

import Form from '../../components/forms/Form.jsx';
import FormGroup from '../../components/forms/FormGroup.jsx';
import FormControl from '../../components/forms/FormControl.jsx';
import SuccessButton from '../../components/buttons/SuccessButton.jsx';
import Loading from '../../components/global/Loading.jsx';

class ArticleEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  validations() {
    const component = this;

    return {
      rules: {
        articleTitle: {
          required: true
        }
      },
      messages: {
        articleTitle: {
          required: 'An article title is required!'
        }
      },
      submitHandler() {
        const form = component.refs.editArticleForm.refs.form;
        const article = {
          content: getValue(form, '[name="articleContent"]'),
          published: isChecked(form, '[name="articlePublished"]'),
          slug: getValue(form, '[name="articleSlug"]'),
          standfirst: getValue(form, '[name="articleStandfirst"]'),
          tags: getValue(form, '[name="articleTags"]')
            .split(',')
            .map(string => string.trim()),
          title: getValue(form, '[name="articleTitle"]')
        };

        if (! component.props.newArticle) {
          article._id = component.props.articleId;
          article.date = component.props.article.date;
        }

        Meteor.call('saveArticle', article, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert(
              `Article  ${component.props.newArticle ? 'added' : 'saved'}!`,
              'success'
            );
          }
        });
      }
    };
  }

  generateSlug = (event) => {
    const form         = this.refs.editArticleForm.refs.form;
    const title        = event.target.value;

    setValue(
      form,
      '[name="articleSlug"]',
      getSlug(title, { custom: { "'": '' } })
    );
  }

  static handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    if (! this.props.ready) return <Loading/>;

    const article = this.props.article;

    return <section className="page-content editor">
      <Form
        ref="editArticleForm"
        id="edit-article"
        className="edit-article"
        validations={ this.validations() }
        onSubmit={ this.handleSubmit }
      >
        <FormGroup>
          <FormControl
            style="checkbox"
            name="articlePublished"
            label="Published?"
            defaultValue={ article && article.published }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="input"
            type="text"
            name="articleTitle"
            label="Title"
            onChange={ this.generateSlug }
            defaultValue={ article && article.title }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            disabled={ true }
            showLabel={ false }
            style="input"
            type="text"
            name="articleSlug"
            label="Slug"
            defaultValue={ article && article.slug }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="textarea"
            name="articleStandfirst"
            label="Standfirst"
            defaultValue={ article && article.standfirst }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="textarea"
            name="articleContent"
            label="Content (markdown)"
            defaultValue={ article && article.content }
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            showLabel={ false }
            style="input"
            type="text"
            name="articleTags"
            label="Tags"
            defaultValue={ article && article.tags }
          />
        </FormGroup>
        <FormGroup>
          <SuccessButton
            type="submit"
            label={ this.props.newArticle ? 'Add article' : 'Save article' }
          />
         </FormGroup>
      </Form>
    </section>;
  }
}

ArticleEditor.propTypes = {
  article: PropTypes.object,
  ready: PropTypes.bool
};

export default createContainer((params) => {
  const articleId = params.articleId || '';
  const subscription = Meteor.subscribe('articleEditor', articleId);

  return {
    article: Articles.findOne({ _id: articleId }),
    ready: subscription.ready()
  };
}, ArticleEditor);
