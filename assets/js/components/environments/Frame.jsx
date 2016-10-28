import React, { Component, PropTypes } from 'react'

import AppHeader from './../organisms/AppHeader.jsx'
import ReactGA from 'react-ga'

const GOOGLE_ANALYTICS = process.env.GOOGLE_ANALYTICS
const NODE_ENV = process.env.NODE_ENV

class Frame extends Component {

  componentDidMount() {
    ReactGA.initialize(GOOGLE_ANALYTICS, {
      debug: NODE_ENV !== 'production'
    })
  }

  render() {
    return (
      <div>
        <AppHeader />
        { this.props.children }
      </div>
    )
  }
}

Frame.propTypes = {
  children: PropTypes.any
}

export default Frame
