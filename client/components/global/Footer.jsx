import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';

const handleLogOut = (event) => {
  event.preventDefault();

  Meteor.logout();
};

class Footer extends Component {
  render() {
    return (
      <footer className="footer-main">
        <div>&copy; Benjamin Brown</div>
        {Meteor.user() &&
          <div className="footer-main__session-data">
            Logged in as {Meteor.user().profile.name}<br/>
            <a
              href="#"
              onClick={() => { handleLogOut(event); }}
            >
              Log out
            </a>
          </div>
        }
      </footer>
    );
  }
}

export default Footer;
