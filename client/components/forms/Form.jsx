import React, { Component } from 'react'

class Form extends Component {
  static handleSubmit (event) {
    event.preventDefault()
  }

  componentDidMount () {
    const validations = this.props.validations

    if (validations) {
      $(this.refs.form).validate(validations)
    }
  }

  render () {
    return <form
      ref='form'
      id={this.props.id}
      className={this.props.className}
      onSubmit={this.handleSubmit}
    >
      { this.props.children }
    </form>
  }
}

export default Form
