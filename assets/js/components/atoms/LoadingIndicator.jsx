import React, { Component, PropTypes } from 'react'

class LoadingIndicator extends Component {
  render() {
    return (
      <p>
        <i className="fa fa-spinner"></i>
        <span>{this.props.message}</span>
      </p>
    )
  }
}

LoadingIndicator.propTypes = {
  message: PropTypes.string
}

export default LoadingIndicator
