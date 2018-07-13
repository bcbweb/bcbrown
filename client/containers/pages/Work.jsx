import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'
import { Helmet } from 'react-helmet'

import Projects from '../../../collections/projects'
import Loading from '../../components/global/Loading.jsx'

class Work extends Component {
  static deleteItem (project) {
    Meteor.call('removeProject', project, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger')
      } else {
        Bert.alert('Project removed!', 'success')
      }
    })
  }

  render () {
    if (!this.props.ready) return <Loading />

    if (this.props.projects.length === 0) {
      return <p>No projects to display.</p>
    }

    const adminButtonClasses = [
      'admin-button',
      'portfolio__admin-button'
    ].join(' ')

    return (
      <section className='page-content work'>
        <Helmet>
          <meta
            property='og:description'
            content='View my portfolio.'
          />
          <meta
            name='description'
            content='View my portfolio.'
          />
        </Helmet>
        <header><h1>Some recent projects</h1></header>
        <article className='content'>
          <ul className='portfolio'>
            {this.props.projects.map(project => (
              <li key={project._id}>
                <a
                  className='image-link'
                  href={`/work/${project.slug}`}
                  style={{
                    backgroundImage: `url(${project.featuredImageUrl})`
                  }}
                />
                {this.props.hasUser &&
                <ul className='portfolio__admin-options'>
                  <li>
                    <button
                      className={
                        `${adminButtonClasses} ${' portfolio__edit'}`
                      }
                      onClick={
                        () => FlowRouter.go(`/work/${project._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                  </li>
                  <li>
                    <button
                      className={
                        `${adminButtonClasses} ${' portfolio__delete'}`
                      }
                      onClick={() => this.deleteItem(project)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
                }
              </li>
            ))}
          </ul>
        </article>
      </section>
    )
  }
}

Work.propTypes = {
  hasUser: PropTypes.object,
  projects: PropTypes.array,
  ready: PropTypes.bool
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('allProjects')

  return {
    hasUser: Meteor.user(),
    projects: Projects.find({}, { sort: { updated: -1 } }).fetch(), // eslint-disable-line space-unary-ops
    ready: subscription.ready()
  }
}, Work)
