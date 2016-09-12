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
          survey={this.props.survey}
          dispatch={this.props.dispatch} />

      </article>
    )
  }
}

AdminDashboard.propTypes = {
  survey: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    survey: state.survey
  })
)(AdminDashboard)
