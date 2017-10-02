import React, { Component } from 'react'
import { Bert } from 'meteor/themeteorchef:bert'

class Login extends Component {
  render () {
    return <section className='page-content login'>
      <header><h1>Log in</h1></header>
      {!Meteor.user() &&
        <a
          href='#'
          onClick={
            () => {
              Meteor.loginWithGoogle(
                {
                  requestPermissions: [
                    'https://www.googleapis.com/auth/userinfo.email',
                    'https://www.googleapis.com/auth/userinfo.profile'
                  ]
                },
                (error) => {
                  if (error) Bert.alert(error, 'danger')
                  else Bert.alert('Logged in.', 'success')
                }
              )
            }
          }
          type='button'
        >
          Sign in with Google
        </a>
      }
      {Meteor.user() &&
        <p>Already logged in :)</p>
      }
    </section>
  }
}

export default Login
