import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import { connect } from 'react-redux'

import Pages from '../../../collections/pages'

class Navigation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      menuOpen: false,
      menuItems: []
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.pages !== prevProps.pages) {
      const pages = this.props.defaultPages.concat(this.props.pages)

      this.setState({
        menuItems: pages.map(
          ({_id, slug, title}) => (
            {
              _id,
              slug,
              title,
              active: this.props.currentPage === slug
            }
          )
        )
      })
    }
  }

  toggleMenu () {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render () {
    if (!this.props.ready) return false
    if (!this.props.pages) return <div>No pages</div>

    let menuItemsClass = 'navigation-main__menu-items'
    if (this.state.menuOpen) {
      menuItemsClass = `${menuItemsClass} ${menuItemsClass}_open`
    }

    return (
      <nav className='navigation-main'>
        <span aria-hidden='true'
          data-icon='&#xe5d2;'
          className='menu__icon navigation-main__hamburger'
          onClick={() => {
            this.toggleMenu()
          }}
        />
        <ul className={menuItemsClass}>
          {this.state.menuItems.map((menuItem) => {
            let menuLinkClass = `navigation-main__menu-link${menuItem.active ? ' navigation-main__menu-link_active' : ''}`

            return <li key={menuItem._id}>
              <a
                className={menuLinkClass}
                href={`/${menuItem.slug}`}
                onClick={() => {
                  this.forceUpdate()
                  this.setState({
                    menuOpen: false
                  })
                }}
              >
                {menuItem.title}
              </a>
            </li>
          })}
        </ul>
      </nav>
    )
  }
}

Navigation.propTypes = {
  defaultPages: PropTypes.array,
  pages: PropTypes.array,
  ready: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage
  }
}

const Container = createContainer(() => {
  const subscription = Meteor.subscribe('allPages')

  return {
    defaultPages: [
      { _id: 0, title: 'Articles', slug: 'articles' },
      { _id: 1, title: 'Work', slug: 'work' }
    ],
    pages: Pages.find(
      { mainMenuItem: true },
      { sort: ['order', 'asc'] }
    ).fetch(),
    ready: subscription.ready()
  }
}, Navigation)

export default connect(mapStateToProps)(Container)
