import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';

import Header from '../components/global/Header.jsx';
import Navigation from '../components/global/Navigation.jsx';
import Footer from '../components/global/Footer.jsx';
import Loading from '../components/global/Loading.jsx';
import Store from '../store/store';

class Layout extends Component {
  getView() {
    if (this.props.canView()) {
      return this.props.content;
    }

    return <div>You don't have permission to access this page.</div>;
  }

  render() {
    return <Provider store={Store}>
      <div className="app-root">
        <Helmet htmlAttributes={{ lang: 'en-GB' }}/>
        <Navigation/>
        <Header/>
        <main>
          { this.props.loggingIn ? <Loading /> : this.getView() }
        </main>
        <Footer/>
      </div>
    </Provider>;
  }
}

Layout.propTypes = {
  loggingIn: PropTypes.bool,
  hasUser: PropTypes.object,
  isPublic: PropTypes.func,
  canView: PropTypes.func
};

export default createContainer(() => ({
  loggingIn: Meteor.loggingIn(),
  hasUser: Meteor.user(),
  isPublic(route) {
    return [
      'index',
      'articles',
      'work',
      'singlePage',
      'tagResults',
      'login',
      'notFound',
      'articleView',
      'projectView'
    ].indexOf(route) > -1; // eslint-disable-line space-unary-ops
  },
  canView() {
    const currentRoute = FlowRouter.current();
    const currentName = currentRoute.route.name;
    const currentSlug = currentRoute.params.slug;

    return (
      this.isPublic(currentName) ||
      this.isPublic(currentSlug) ||
      (Roles.userIsInRole(Meteor.userId(), 'admin'))
    );
  }
}), Layout);
