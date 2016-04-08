import React, { Component, PropTypes } from 'react'

import AppHeader from './../organisms/AppHeader.jsx'

class Frame extends Component {
  render() {
    return (
      <div>
        {/* }<AppHeader /> */}
        { this.props.children }
      </div>
    )
  }
}

Frame.propTypes = {
  children: PropTypes.any
}

export default Frame
