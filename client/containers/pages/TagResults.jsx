import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Helmet } from 'react-helmet';

import Articles from '../../../collections/articles';
import Pages from '../../../collections/pages';
import Projects from '../../../collections/projects';

import ListItemArticle from '../../components/global/ListItemArticle.jsx';
import ListItemPage from '../../components/global/ListItemPage.jsx';
import ListItemProject from '../../components/global/ListItemProject.jsx';

class TagResults extends Component {
  render() {
    const tag = this.props.tag;

    if (this.props.results.length === 0) {
      return <p>
        No articles, pages, or projects have been tagged with "{tag}" yet.
      </p>;
    }

    return (
      <section className="page-content tag-results">
        <Helmet>
          <meta
            property="og:description"
            content={`Entries tagged with ${tag}.`}
          />
          <meta
            name="description"
            content={`Entries tagged with ${tag}.`}
          />
        </Helmet>
        <p className="tag-results__info">Entries tagged with "{tag}":</p>
        {this.props.results.map((result) => {
          switch (result.type) {
            case 'article':
              return <ListItemArticle
                date={result.updated}
                key={result._id}
                slug={result.slug}
                standfirst={result.standfirst}
                tags={result.tags}
                title={result.title}
              />;
            case 'page':
              return <ListItemPage
                date={result.updated}
                key={result._id}
                slug={result.slug}
                standfirst={result.standfirst}
                tags={result.tags}
                title={result.title}
              />;
            case 'project':
              return <ListItemProject
                date={result.updated}
                key={result._id}
                slug={result.slug}
                standfirst={result.standfirst}
                tags={result.tags}
                title={result.title}
              />;
            default:
              return false;
          }
        })}
      </section>
    );
  }
}

TagResults.propTypes = {
  results: PropTypes.array
};

export default createContainer((params) => {
  const articlesSubscription = Meteor.subscribe('allArticles');
  const pagesSubscription = Meteor.subscribe('allPages');
  const projectsSubscription = Meteor.subscribe('allProjects');

  const tag = params.tag;

  let results = [];

  if (
    articlesSubscription.ready() &&
    pagesSubscription.ready() &&
    projectsSubscription.ready()
  ) {
    const articles = Articles.find({ tags: tag }).fetch()
      .map(article => ({ ...article, type: 'article' }));
    const pages = Pages.find({ tags: tag }).fetch()
      .map(page => ({ ...page, type: 'page' }));
    const projects = Projects.find({ tags: tag }).fetch()
      .map(project => ({ ...project, type: 'project' }));

    results = articles.concat(pages, projects);
  }

  return { results };
}, TagResults);
