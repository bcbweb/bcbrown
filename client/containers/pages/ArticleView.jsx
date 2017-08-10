import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import DOMPurify from 'dompurify';
import { ShareButtons } from 'react-share';

import Articles from '../../../collections/articles';
import { formatLastUpdate } from '../../helpers/react';

class ArticleView extends Component {
  render() {
    const article = this.props.article;

    if (! article) return <div/>;

    const {
      FacebookShareButton,
      GooglePlusShareButton,
      TwitterShareButton
    } = ShareButtons;

    const dateObject = formatLastUpdate(article.updated, false);
    const longDate = `${dateObject.month} ${dateObject.day} ${dateObject.year}`;

    let cleanContent = '';
    if (this.props.ready) {
      cleanContent = DOMPurify.sanitize(article.content);
    }

    const articleUrl = `https://bcbrown.com/articles/${this.props.slug}`;

    return (
      <section className="page-content article-view">
        <div className="page-content__actions">
          <a href="/articles" className="link__back">Back to articles</a>
          <ul className="social-icons">
            <li className="social-icons__share-text">Share via: </li>
            <li className="social-icons__icon social-icons__twitter">
              <TwitterShareButton
                url={articleUrl}
                title={article.title}
              >
                <span data-icon="&#xe903;" aria-hidden="true"></span>
              </TwitterShareButton>
            </li>
            <li className="social-icons__icon social-icons__facebook">
              <FacebookShareButton
                url={articleUrl}
                title={article.title}
                picture={`${Meteor.absoluteUrl()}images/icons/open-graph.jpg`}
              >
                <span data-icon="&#xe904;" aria-hidden="true"></span>
              </FacebookShareButton>
            </li>
            <li className="social-icons__icon social-icons__google-plus">
              <GooglePlusShareButton
                url={articleUrl}
              >
                <span data-icon="&#xe905;" aria-hidden="true"></span>
              </GooglePlusShareButton>
            </li>
          </ul>
        </div>
        <header><h1>{this.props.ready && article.title}</h1></header>
        <time>{this.props.ready && longDate}</time>
        <div dangerouslySetInnerHTML={{ __html: cleanContent }}/>
      </section>
    );
  }
}

ArticleView.propTypes = {
  article: PropTypes.object,
  ready: PropTypes.bool
};

export default createContainer((params) => {
  const subscription = Meteor.subscribe('singleArticle', params.slug);

  return {
    article: Articles.findOne({ slug: params.slug }),
    ready: subscription.ready()
  };
}, ArticleView);
