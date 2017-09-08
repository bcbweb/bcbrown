import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createContainer } from 'meteor/react-meteor-data';

import Pages from '../../../collections/pages';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = { menuOpen: false };
  }

  toggleMenu() {
    this.setState({
      menuOpen: ! this.state.menuOpen
    });
  }

  render() {
    if (! this.props.ready) return false;
    if (! this.props.pages) return <div>No pages</div>;

    const pages  = this.props.defaultPages.concat(this.props.pages);

    let menuItemsClass = 'navigation-main__menu-items';
    if (this.state.menuOpen) {
      menuItemsClass = `${menuItemsClass} ${menuItemsClass}_open`;
    }

    return (
      <nav className="navigation-main">
        <span aria-hidden="true"
          data-icon="&#xe5d2;"
          className="menu__icon navigation-main__hamburger"
          onClick={() => {
            this.toggleMenu();
          }}
        />
      <ul className={menuItemsClass}>
          {pages.map((page) => {
            let menuLinkClass = 'navigation-main__menu-link';

            if (this.props.currentPage === page.slug) {
              menuLinkClass = `${menuLinkClass} ${menuLinkClass}_active`;
            }

            return <li key={page._id}>
              <a
                className={ menuLinkClass }
                href={`/${page.slug}`}
              >
                {page.title}
              </a>
            </li>;
          })}
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  defaultPages: PropTypes.array,
  pages: PropTypes.array,
  ready: PropTypes.bool
};

const meteorContainer = createContainer(() => {
  const subscription = Meteor.subscribe('allPages');

  return {
    currentRoute: FlowRouter.current(),
    defaultPages: [
      { _id: 0, title: 'Articles', slug: 'articles' },
      { _id: 1, title: 'Work', slug: 'work' }
    ],
    pages: Pages.find(
      { mainMenuItem: true },
      { sort: ['order', 'asc'] }
    ).fetch(),
    ready: subscription.ready()
  };
}, Navigation);

const mapStateToProps = state => ({
  currentPage: state.currentPage
});

export default connect(mapStateToProps)(meteorContainer);
