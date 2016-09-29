import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router'

import {
  Button
} from 'react-bootstrap'

import Card from './../atoms/Card.jsx'
import SurveyQuestion from './../organisms/SurveyQuestion.jsx'
import SurveyCompletionIndicator from './../organisms/SurveyCompletionIndicator.jsx'

import {
  incrementSurveyQuestionIndex,
  decrementSurveyQuestionIndex,
  removeSurveyQuestionResponseAndIntensity
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

  goBack() {
    if (this.props.index > 0) {
      this.decrementIndex()
    }
    else {
      browserHistory.push('/')
    }
  }

  nextQuestionOrSubmit() {
    if (this.props.index < this.props.questions.length - 1) {
      this.incrementIndex()
    }
    else {
      this.props.onSubmit()
    }
  }

  skipQuestion() {
    const questionId = this.props.questions[this.props.index].id
    this.props.dispatch(removeSurveyQuestionResponseAndIntensity(questionId))
    this.nextQuestionOrSubmit()
  }

  goForward() {
    try {
      this.validateSelections()
      this.state.alerts = {}
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
