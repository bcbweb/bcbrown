import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import Header from '../components/global/Header.jsx';
import Navigation from '../components/global/Navigation.jsx';
import Footer from '../components/global/Footer.jsx';
import Loading from '../components/global/Loading.jsx';
import Login from './pages/Login.jsx';

class Layout extends Component {
  getView() {
    return this.props.canView() ? this.props.content : <Login />;
  }

  render() {
    return <div className="app-root">
      <Helmet htmlAttributes={{ lang: 'enGB' }}/>
      <Navigation/>
      <Header/>
      <main>
        { this.props.loggingIn ? <Loading /> : this.getView() }
      </main>
      <Footer/>
    </div>;
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
      'contact',
      'work',
      'services',
      'singlePost',
      'tagResults',
      'login',
      'recoverPassword',
      'resetPassword',
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
      Meteor.user()
    );
  }
}), Layout);
