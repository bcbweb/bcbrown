import React, { Component } from 'react';

import FormControl from './FormControl.jsx';

class PasswordInput extends Component {
  render() {
    return <FormControl
      reference={ this.props.ref }
      showLabel={ this.props.showLabel }
      labelLink={ this.props.labelLink }
      style="input"
      name="password"
      type="password"
      label="Password"
    />;
  }
}

export default PasswordInput;
