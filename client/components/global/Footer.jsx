import React, { Component } from 'react'

const handleLogOut = (event) => {
  event.preventDefault()

  Meteor.logout()
}

class Footer extends Component {
  render () {
    let roles = ''
    if (Meteor.user() && Meteor.user().roles) {
      roles = Meteor.user().roles.join('/')
    }
    let username = `(No name in user profile) (${roles})`
    if (Meteor.user() && Meteor.user().profile) {
      username = `${Meteor.user().profile.name} (${roles})`
    }

    return (
      <footer className='footer-main'>
        <div>&copy; Benjamin Brown</div>
        {Meteor.user() &&
          <div className='footer-main__session-data'>
            Logged in as {username}<br />
            <a
              href='#'
              onClick={(event) => { handleLogOut(event) }}
            >
              Log out
            </a>
          </div>
        }
      </footer>
    )
  }
}

export default Footer
