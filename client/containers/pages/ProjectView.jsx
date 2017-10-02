import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import DOMPurify from 'dompurify'
import { Helmet } from 'react-helmet'

import Projects from '../../../collections/projects'
import Loading from '../../components/global/Loading.jsx'

class ProjectView extends Component {
  render () {
    if (!this.props.ready) return <Loading />

    if (!this.props.project) return <div>Project not found.</div>

    let cleanContent = ''
    cleanContent = DOMPurify.sanitize(this.props.project.description)

    return (
      <section className='page-content project-view'>
        <Helmet>
          <meta
            property='og:description'
            content={this.props.project.standfirst || this.props.project.title}
          />
          <meta
            name='description'
            content={this.props.project.standfirst || this.props.project.title}
          />
        </Helmet>
        <a href='/work' className='link__back'>Back to projects</a>
        <header><h1>{this.props.ready && this.props.project.title}</h1></header>
        {this.props.project.tags[0] &&
          <ul className='project-view__tags tag-list'>
            <li>Tags:&nbsp;</li>
            {this.props.project.tags.map((tag, tagIndex) => {
              const tagHref = `/tag/${tag}`
              return <li key={tagIndex}>
                <a href={tagHref}>{tag}</a>
              </li>
            })}
          </ul>
        }
        <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
      </section>
    )
  }
}

ProjectView.propTypes = {
  project: PropTypes.object,
  ready: PropTypes.bool
}

export default createContainer((params) => {
  const subscription = Meteor.subscribe('singleProject', params.slug)

  return {
    project: Projects.findOne({ slug: params.slug }),
    ready: subscription.ready()
  }
}, ProjectView)
