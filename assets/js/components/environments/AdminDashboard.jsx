import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SurveyBuilder from './../ecosystems/SurveyBuilder.jsx'

import NewRaceForm from './../ecosystems/NewRaceForm.jsx'

class AdminDashboard extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <article>
        <h1>Admin Dashboard</h1>

        <NewRaceForm />

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
