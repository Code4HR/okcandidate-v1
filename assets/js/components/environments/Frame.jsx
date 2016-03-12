import React, { Component, PropTypes } from 'react'

import AppHeader from './../organisms/AppHeader.jsx'

class Frame extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <div className="container">
          { this.props.children }
        </div>
      </div>
    )
  }
}

Frame.propTypes = {
  children: PropTypes.any
}

export default Frame
