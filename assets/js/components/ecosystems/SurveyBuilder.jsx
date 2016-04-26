import React, { Component, PropTypes } from 'react'

import {
  Input
} from 'react-bootstrap'

import SurveyBuilderQuestion from './../organisms/SurveyBuilderQuestion.jsx'

import {
  fetchActiveSurveys,
  toggleSurveyBuilderQuestionEditable,
  updateSurveyBuilderQuestion
} from './../../redux/survey/survey-actions'


class SurveyBuilder extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchActiveSurveys())
  }

  selectSurvey() {
    // this may not actually see any action until there is more than
    // one survey to select.
  }

  toggleEditable(question) {
    if (!question.editable) {
      this.props.dispatch(toggleSurveyBuilderQuestionEditable(question.id))
    }
    else {
      this.props.dispatch(updateSurveyBuilderQuestion(question))
    }
  }

  submitQuestion(question) {
    this.props.dispatch(updateSurveyBuilderQuestion(question))
  }

  render() {
    return (
      <section>
        <Input
          type="select"
          label="Select Campaign"
          placeholder="Active Campaign"
          onChange={this.selectSurvey.bind(this)}>
          {
            this.props.survey.activeSurveys.map(survey => {
              return (
                <option value={survey.id}>{survey.surveyName}</option>
              )
            })
          }
        </Input>

        {
          this.props.survey.questions.map(question => {
            if (question.dataType === 1) {
              return (
                <SurveyBuilderQuestion
                  key={question.id}
                  id={question.id}
                  toggleEditable={this.toggleEditable.bind(this)}
                  submitQuestion={this.submitQuestion.bind(this)}
                  question={question} />
              )
            }
          })
        }

      </section>
    )
  }
}

SurveyBuilder.propTypes = {
  survey: PropTypes.object,
  dispatch: PropTypes.func
}

export default SurveyBuilder
