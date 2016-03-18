import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

import SurveyQuestion from './../organisms/SurveyQuestion.jsx'

import {
  fetchActiveSurveys
} from './../../redux/survey/survey-actions'

class SurveyPage extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchActiveSurveys())
  }

  render() {
    return (
      <article>
        <h1>Survey Page</h1>
        <p>This is where the user will take a survey.</p>

        {
          this.props.survey.questions.map(question => {
            return (
              <SurveyQuestion question={question}/>
            )
          })
        }

      </article>
    )
  }
}

SurveyPage.propTypes = {
  survey: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    survey: state.survey
  })
)(SurveyPage)
