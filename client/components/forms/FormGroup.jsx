import React, { Component } from 'react';

class FormGroup extends Component {
  render() {
    return <div className="form-group">
      { this.props.children }
    </div>;
  }
}

export default FormGroup;
