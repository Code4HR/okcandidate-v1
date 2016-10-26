import React, { Component, PropTypes } from 'react'

import AppHeader from './../organisms/AppHeader.jsx'
import ReactGA from 'react-ga'
import ENV from './../constants.js'

const GOOGLE_ANALYTICS = ENV['GOOGLE_ANALYTICS']

class Frame extends Component {

  componentDidMount() {
    ReactGA.initialize(GOOGLE_ANALYTICS, {debug: true})
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
