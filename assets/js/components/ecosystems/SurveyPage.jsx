import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import SurveyQuestionPager from './../ecosystems/SurveyQuestionPager.jsx'
import LoadingIndicator from './../atoms/LoadingIndicator.jsx'

import {
  fetchActiveSurveys,
  submitSurveyAnswers
} from './../../redux/survey/survey-actions'

import {
  Col,
  Grid,
  Row
} from 'react-bootstrap'

class SurveyPage extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {

    // If survey response is undefined, redirect to front page so we can get it.
    // Otherwise, the frontend won't be able to submit the survey.
    if (!this.props.survey.surveyResponseId) {
      browserHistory.push('/')
    }

    this.props.dispatch(fetchActiveSurveys())
  }

  blendQuestionsAndReponses(questions, responses) {
    return questions.map(question => {
      const answer = responses.find(response => {
        return question.id === response.questionId
      })
      if (answer) {
        question.intensity = answer.intensity
        question.selectedAnswer = answer.answerId
      }
      return question
    })
  }

  submit() {
    this.props.dispatch(
      submitSurveyAnswers(this.props.survey.responses)
    )
  }

  render() {

    const questions = this.blendQuestionsAndReponses(
      this.props.survey.questions,
      this.props.survey.responses
    )

    return (
      <article>
        <Grid>
          <Row>
            <Col xs={12} sm={8} smOffset={2}>
              {
                this.props.survey.isFetching || questions.length === 0 ?
                  <LoadingIndicator message="Loading Questions" />
                :
                  <SurveyQuestionPager
                    onSubmit={this.submit.bind(this)}
                    questions={questions}
                    categories={this.props.survey.categories}
                    dispatch={this.props.dispatch} />
              }
            </Col>
          </Row>
        </Grid>
      </article>
    )
  }
}

SurveyPage.propTypes = {
  location: PropTypes.object,
  survey: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    survey: state.survey
  }), null, null, {
    withRef: true
  }
)(SurveyPage)
