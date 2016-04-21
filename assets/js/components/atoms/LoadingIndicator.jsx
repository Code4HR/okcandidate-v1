import React, { Component, PropTypes } from 'react'

class LoadingIndicator extends Component {
  render() {
    return (
      <div style={{textAlign: "center", paddingTop: "2em"}}>
        <p>
          <span style={{fontSize: '1.5em'}}>{this.props.message}</span>
        </p>
      </div>
    )
  }
}

LoadingIndicator.propTypes = {
  message: PropTypes.string
}

export default LoadingIndicator
