import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createContainer } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'

const deleteItem = (user) => {
  Meteor.call('removeUser', user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      Bert.alert('User removed!', 'success')
    }
  })
}

class UserList extends Component {
  render () {
    if (this.props.ready && this.props.users.length === 0) {
      return <div>No users to display.</div>
    }

    const adminButtonClasses = [
      'admin-button',
      'pages__admin-button'
    ].join(' ')

    console.log(this.props.users)
    const userId = Meteor.user()._id

    return <section className='page-content users'>
      {this.props.users.map(user =>
        <article key={user._id} className='users__list-item'>
          <dl>
            <dt>Username</dt>
            <dd>Ben{user.profile.name}</dd>
            <dt>Roles</dt>
            <dd>
              <ul>
                {
                  user.roles &&
                    user.roles.map(role => <li key={role}>{role}</li>)
                }
              </ul>
            </dd>
            <dt>Modify</dt>
            <dd>
              <ul className='users__admin-options'>
                <li>
                  <button
                    className={
                      `${adminButtonClasses} ${' users__delete'}`
                    }
                    onClick={() => deleteItem(user)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </dd>
            <hr />
          </dl>
        </article>
      )}
    </section>
  }
}

UserList.propTypes = {
  hasUser: PropTypes.object,
  pages: PropTypes.array,
  ready: PropTypes.bool
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('allPages')

  return {
    hasUser: Meteor.user(),
    users: Meteor.users.find({}).fetch(),
    ready: subscription.ready()
  }
}, UserList)
