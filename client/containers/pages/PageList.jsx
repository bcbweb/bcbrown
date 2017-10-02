import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'

import Pages from '../../../collections/pages'

const deleteItem = (page) => {
  Meteor.call('removePage', page, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      Bert.alert('Project removed!', 'success')
    }
  })
}

class PageList extends Component {
  render () {
    if (this.props.ready && this.props.pages.length === 0) {
      return <div>No pages to display.</div>
    }

    const adminButtonClasses = [
      'admin-button',
      'pages__admin-button'
    ].join(' ')

    const userId = Meteor.user()._id

    return <section className='page-content pages'>
      {this.props.pages.map((page) => {
        if (!page.published && userId !== page.author) return false

        return <article key={page._id} className='pages__list-item'>
          <h1>{page.title}</h1>
          <ul className='pages__admin-options'>
            <li>
              <button
                className={
                  `${adminButtonClasses} ${' pages__edit'}`
                }
                onClick={
                  () => FlowRouter.go(`/pages/${page._id}/edit`)
                }
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className={
                  `${adminButtonClasses} ${' pages__delete'}`
                }
                onClick={() => deleteItem(page)}
              >
                Delete
              </button>
            </li>
          </ul>
        </article>
      })}
    </section>
  }
}

PageList.propTypes = {
  hasUser: PropTypes.object,
  pages: PropTypes.array,
  ready: PropTypes.bool
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('allPages')

  return {
    hasUser: Meteor.user(),
    pages: Pages.find({}).fetch(),
    ready: subscription.ready()
  }
}, PageList)
