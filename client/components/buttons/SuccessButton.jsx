import React, { Component } from 'react'

import Button from './Button.jsx'

class SuccessButton extends Component {
  render () {
    return <Button
      type={this.props.type}
      style='success'
      label={this.props.label}
      href={this.props.href}
      onClick={this.props.onClick}
    />
  }
}

export default SuccessButton
