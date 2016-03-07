import React, { Component, PropTypes } from 'react'

class Frame extends Component {
  render() {
    return (
      <div>
        <h1>OKCandidate</h1>
        
        { this.props.children }
          
      </div>
    )
  }
}

Frame.propTypes = {}

export default Frame
