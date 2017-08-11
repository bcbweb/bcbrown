import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import DOMPurify from 'dompurify';

import Pages from '../../../collections/pages';

class SinglePage extends Component {
  render() {
    if (
      this.props.ready &&
      (! this.props.page || ! this.props.page.published)
    ) {
      return <div className="page-not-found">Page not found :(</div>;
    }

    const config = { ADD_ATTR: ['target'] };
    let cleanContent = '';
    if (this.props.ready) {
      cleanContent = DOMPurify.sanitize(this.props.page.content, config);
    }

    return (
      <section
        className={`page-content ${this.props.slug}`}
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />
    );
  }
}

SinglePage.propTypes = {
  page: PropTypes.object,
  ready: PropTypes.bool
};

export default createContainer((params) => {
  const subscription = Meteor.subscribe('singlePage', params.slug);

  return {
    page: Pages.findOne({ slug: params.slug }),
    ready: subscription.ready()
  };
}, SinglePage);
