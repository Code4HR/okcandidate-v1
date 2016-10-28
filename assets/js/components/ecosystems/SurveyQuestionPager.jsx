import React, { Component, PropTypes } from 'react'
import ReactGA  from 'react-ga'
import bowser from 'bowser'

import { browserHistory } from 'react-router'

import {
  Button,
  Alert
} from 'react-bootstrap'

import Card from './../atoms/Card.jsx'
import SurveyQuestion from './../organisms/SurveyQuestion.jsx'
import SurveyCompletionIndicator from './../organisms/SurveyCompletionIndicator.jsx'
import { getThirds } from './../utils/matchLevel'

import {
  incrementSurveyQuestionIndex,
  decrementSurveyQuestionIndex,
  removeSurveyQuestionResponseAndIntensity,
  addGlobalAlert
} from './../../redux/survey/survey-actions'

const style = {
  buttonTray: {
    container: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    spacer: {
      flex: '1'
    }
  }
}

class SurveyQuestionPager extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alerts: {},
      finalSkip: false
    }
  }

  componentDidMount() {
    if (bowser.ios) {
      window.scrollTo(0, 0)
    }
  }

  goBack() {
    if (this.props.index > 0) {
      this.decrementIndex()
    }
    else {
      browserHistory.push('/')
    }
  }

  nextQuestionOrSubmit() {

    function isLastQuestion() {
      return this.props.index === this.props.questions.length - 1
    }

    function userHasAnsweredEnoughQuestions() {
      const third = getThirds(this.props.questions.length)
      return this.props.answered > third
    }

    // if the current question is not the last question
    if (!isLastQuestion.call(this)) {
      this.incrementIndex()
      ReactGA.event({
        category: 'Survey',
        action: 'Answered question'
      })
    }

    else if (!userHasAnsweredEnoughQuestions.call(this)) {
      this.props.dispatch(
        addGlobalAlert(
          'warning',
          'You should answer more questions to get a good match'
        )
      )
    }

    else if (userHasAnsweredEnoughQuestions.call(this)) {
      this.props.onSubmit()
      ReactGA.event({
        category: 'Survey',
        action: 'Finished'
      })
    }

  }

  skipQuestion() {
    const questionId = this.props.questions[this.props.index].id
    this.props.dispatch(removeSurveyQuestionResponseAndIntensity(questionId))
    this.setState({
      alerts: {}
    })
    this.nextQuestionOrSubmit()
    ReactGA.event({
      category: 'Survey',
      action: 'Skipped A Question'
    })
  }

  goForward() {
    try {
      this.validateSelections()
      this.setState({
        alerts: {}
      })
      this.nextQuestionOrSubmit()
    }
    catch (errors) {
      this.setState({
        alerts: errors
      })
    }
  }

  incrementIndex() {
    this.props.dispatch(incrementSurveyQuestionIndex())
  }

  decrementIndex() {
    this.props.dispatch(decrementSurveyQuestionIndex())
  }

  validateSelections() {
    const errors = {}
    const currentQuestion = this.props.questions[this.props.index]
    if (!currentQuestion.selectedAnswer && !currentQuestion.intensity) {
      return
    }
    if (!currentQuestion.selectedAnswer) {
      errors.answer = 'Please select an answer'
    }
    if (!currentQuestion.intensity) {
      errors.intensity = 'How do you feel about this?'
    }
    if (errors.intensity || errors.answer) {
      throw errors
    }
  }

  render() {

    const currentQuestion = this.props.questions[this.props.index]

    return (
      <section>

        <SurveyCompletionIndicator
          questionsAnswered={this.props.answered}
          totalQuestions={this.props.questions.length}
          onSubmit={this.props.onSubmit} />

        <Card>

          {
            this.props.answered === 0 &&
            <Alert bsStyle="info">
              You don't need to answer every question.  Skipping a question or two
              won't prevent you from finding your OKCandidate.
            </Alert>
          }

          <SurveyQuestion
            style={{marginBottom: '2em'}}
            question={currentQuestion}
            alerts={this.state.alerts}
            dispatch={this.props.dispatch} />

            <div style={style.buttonTray.container}>
              <Button
                ref="backButton"
                onClick={this.goBack.bind(this)}
                bsSize="large">Back</Button>

              <div>
                <Button
                  ref="skipButton"
                  bsStyle="warning"
                  bsSize="large"
                  onClick={this.skipQuestion.bind(this)}>Skip</Button>

                {' '}

                <Button
                  ref="nextButton"
                  bsStyle="primary"
                  bsSize="large"
                  onClick={this.goForward.bind(this)}>Next</Button>
              </div>

            </div>
        </Card>

      </section>
    )
  }

}

SurveyQuestionPager.propTypes = {
  onSubmit: PropTypes.func,
  questions: PropTypes.array,
  answered: PropTypes.number,
  categories: PropTypes.array,
  dispatch: PropTypes.func,
  index: PropTypes.number
}

export default SurveyQuestionPager
