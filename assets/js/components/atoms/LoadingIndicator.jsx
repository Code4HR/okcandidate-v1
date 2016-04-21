import React, { Component, PropTypes } from 'react'
import Loader from 'react-loaders'

class LoadingIndicator extends Component {
  render() {
    return (
      <div style={{textAlign: "center", paddingTop: "2em"}}>
        <Loader type="ball-pulse" active="true" />
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
