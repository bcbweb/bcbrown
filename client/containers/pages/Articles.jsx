import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createFragment from 'react-addons-create-fragment'
import { createContainer } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'
import { Helmet } from 'react-helmet'

import Articles from '../../../collections/articles'
import ListItemArticle from '../../components/global/ListItemArticle.jsx'
import Loading from '../../components/global/Loading.jsx'

class ArticlesPage extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    if (!this.props.ready) return <Loading />

    if (this.props.articles.length === 0) {
      return <p>No articles to display.</p>
    }

    const deleteItem = (article) => {
      Meteor.call('removeArticle', article, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger')
        } else {
          Bert.alert('Article removed!', 'success')
        }
      })
    }

    const adminButtonClasses = [
      'admin-button',
      'portfolio__admin-button'
    ].join(' ')

    const userId = (Meteor.user()) ? Meteor.user()._id : 'anon'

    return (
      <section className='page-content articles'>
        <Helmet>
          <meta
            property='og:description'
            content='Read my articles.'
          />
          <meta
            name='description'
            content='Read my articles.'
          />
        </Helmet>
        {this.props.articles.map((article) => {
          if (!article.published && userId !== article.author) return false

          const listItem = <ListItemArticle
            date={article.date}
            key={article._id}
            slug={article.slug}
            standfirst={article.standfirst}
            tags={article.tags}
            title={article.title}
          />

          const adminLinks = <ul className='articles__admin-options'>
            <li>
              <button
                className={
                  `${adminButtonClasses} ${' articles__edit'}`
                }
                onClick={
                  () => FlowRouter.go(`/articles/${article._id}/edit`)
                }
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className={
                  `${adminButtonClasses} ${' articles__delete'}`
                }
                onClick={() => deleteItem(article)}
              >
                Delete
              </button>
            </li>
          </ul>

          if (this.props.hasUser) {
            return createFragment({
              listItem,
              adminLinks
            })
          }

          return listItem
        })}
      </section>
    )
  }
}

ArticlesPage.propTypes = {
  articles: PropTypes.array.isRequired,
  hasUser: PropTypes.object,
  ready: PropTypes.bool
}

export default createContainer(() => {
  const articlesSubscription = Meteor.subscribe('allArticles')

  return {
    articles: Articles.find({}, { sort: { date: -1 } }).fetch(), // eslint-disable-line space-unary-ops
    hasUser: Meteor.user(),
    ready: articlesSubscription.ready()
  }
}, ArticlesPage)
