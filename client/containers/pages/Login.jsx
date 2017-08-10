import React, { Component } from 'react';
import { Bert } from 'meteor/themeteorchef:bert';

import { getValue } from '../../helpers/react';
import Form from '../../components/forms/Form.jsx';
import FormGroup from '../../components/forms/FormGroup.jsx';
import EmailInput from '../../components/forms/EmailInput.jsx';
import PasswordInput from '../../components/forms/PasswordInput.jsx';
import SuccessButton from '../../components/buttons/SuccessButton.jsx';

class Login extends Component {
  validations() {
    const component = this;

    return {
      rules: {
        emailAddress: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      },
      messages: {
        emailAddress: {
          required: 'Email address is required.',
          email: 'Email invalid.'
        },
        password: {
          required: 'Password is required.'
        }
      },
      submitHandler() {
        const form     = component.refs.loginForm.refs.form;
        const email    = getValue(form, '[name="emailAddress"]');
        const password = getValue(form, '[name="password"]');

        console.log(Meteor.users.find().fetch());
        console.log(email, password);

        Meteor.loginWithPassword(email, password, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Logged in!', 'success');
          }
        });
      }
    };
  }

  static handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const passwordLabelLink = {
      href: '/recover-password',
      label: 'Forgotten your password?'
    };

    return <div>
      <h1>Log in</h1>
      <p>
        Please log in with your username and password.
      </p>
      <Form
        ref="loginForm"
        id="login"
        className="login"
        validations={ this.validations() }
        onSubmit={ this.handleSubmit }
      >
        <FormGroup>
          <EmailInput reference="emailAddress" showLabel={ true } />
        </FormGroup>
        <FormGroup>
          <PasswordInput
            reference="password"
            showLabel={ true }
            labelLink={ passwordLabelLink }
          />
        </FormGroup>
        <FormGroup>
          <SuccessButton type="submit" label="Login" />
        </FormGroup>
      </Form>
      <p>Don't have an account? <a href="/signup">Sign Up</a>.</p>
    </div>;
  }
}

export default Login;
