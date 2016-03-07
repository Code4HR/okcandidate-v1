import React, { Component, PropTypes } from 'react'

class SplashPage extends Component {
  render() {
    return (
      <article>
        <h1>Splash Page</h1>
        <p>Marketing material and such goes here.</p>
      </article>
    )
  }
}

SplashPage.propTypes = {
  splash: PropTypes.object
}

export default SplashPage
