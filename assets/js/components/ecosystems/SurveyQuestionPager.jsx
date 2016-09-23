import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router'

import {
  Button
} from 'react-bootstrap'

import Card from './../atoms/Card.jsx'
import SurveyQuestion from './../organisms/SurveyQuestion.jsx'
import SurveyQuestionCategoryPager from './../organisms/SurveyQuestionCategoryPager.jsx'
import SurveyCompletionIndicator from './../organisms/SurveyCompletionIndicator.jsx'
import colors from './../style/colors'

import {
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
  },
  cardStyle: {
    marginBottom: '1em',
    backgroundColor: colors.darkBlue,
    color: 'white',
    padding: '1em'
  }
}

class SurveyQuestionPager extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      alerts: {},
      finalSkip: false
    }
  }

  goBack() {
    if (this.state.index > 0) {
      this.decrementIndex()
    }
    else {
      browserHistory.push('/')
    }
  }

  nextQuestionOrSubmit() {
    if (this.state.index < this.props.questions.length - 1) {
      this.incrementIndex()
    }
    else {
      this.props.onSubmit()
    }
  }

  skipQuestion() {
    const questionId = this.props.questions[this.state.index].id
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
    this.setState({
      index: this.state.index + 1
    })
  }

  decrementIndex() {
    this.setState({
      index: this.state.index - 1
    })
  }

  setIndex(index) {
    this.setState({
      index
    })
  }

  validateSelections() {
    const errors = {}
    const currentQuestion = this.props.questions[this.state.index]
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

    const currentQuestion = this.props.questions[this.state.index]

    return (
      <section>

        <Card style={style.cardStyle}>
          <SurveyCompletionIndicator
            questionsAnswered={this.props.answered}
            totalQuestions={this.props.questions.length}
            onSubmit={this.props.onSubmit} />
        </Card>

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
  dispatch: PropTypes.func
}

export default SurveyQuestionPager
