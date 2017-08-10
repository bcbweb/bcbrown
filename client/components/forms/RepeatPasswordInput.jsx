import React, { Component } from 'react';

class RepeatPasswordInput extends Component {
  render() {
    return <FormControl
      ref={ this.props.ref }
      showLabel={ this.props.showLabel }
      labelLink={ this.props.labelLink }
      style="input"
      name="repeatPassword"
      type="password"
      label="Repeat Password"
    />;
  }
}

export default RepeatPasswordInput;
