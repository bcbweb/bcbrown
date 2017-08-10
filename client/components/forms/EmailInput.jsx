import React, { Component } from 'react';

import FormControl from './FormControl.jsx';

class EmailInput extends Component {
  render() {
    return <FormControl
      reference={ this.props.ref }
      showLabel={ this.props.showLabel }
      style="input"
      name="emailAddress"
      type="email"
      label="Email Address"
    />;
  }
}

export default EmailInput;
