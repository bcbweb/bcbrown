import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

class Footer extends Component {
  static handleLogOut(event) {
    event.preventDefault();

    Meteor.logout();
  }

  render() {
    return (
      <footer className="footer-main">
        <div>&copy; Benjamin Brown</div>
        {this.props.hasUser &&
          <div className="footer-main__session-data">
            Logged in as {this.props.user.fullname}<br/>
            <a href="#" onClick={this.handleLogOut}>Log out</a>
          </div>
        }
      </footer>
    );
  }
}

Footer.propTypes = {
  user: PropTypes.object
};

export default createContainer(() => {
  const data = {};

  if (Meteor.user()) {
    data.hasUser = true;

    const firstName = Meteor.user().profile.name.first;
    const lastName = Meteor.user().profile.name.last;

    data.user = {
      fullname: `${firstName} ${lastName}`
    };
  }

  return data;
}, Footer);
