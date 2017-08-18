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
    console.log(Meteor.user());
    let roles = '';
    if (Meteor.user() && Meteor.user().roles) {
      roles = Meteor.user().roles.join('/');
    }
    let username = `(No name in user profile) (${roles})`;
    if (Meteor.user() && Meteor.user().profile) {
      username = `${Meteor.user().profile.name} (${roles})`;
    }

    return (
      <footer className="footer-main">
        <div>&copy; Benjamin Brown</div>
        {Meteor.user() &&
          <div className="footer-main__session-data">
            Logged in as {username}<br/>
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
