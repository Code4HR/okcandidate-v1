import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SurveyBuilder from './../ecosystems/SurveyBuilder.jsx'

class AdminDashboard extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <article>
        <h1>Admin Dashboard</h1>

        <SurveyBuilder
          surveyBuilder={this.props.surveyBuilder}
          dispatch={this.props.dispatch} />

      </article>
    )
  }
}

AdminDashboard.propTypes = {
  surveyBuilder: PropTypes.object,
  admin: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    surveyBuilder: state.surveyBuilder
  })
)(AdminDashboard)
