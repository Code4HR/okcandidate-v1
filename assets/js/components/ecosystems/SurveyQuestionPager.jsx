import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router'

import {
  Button,
  Alert
} from 'react-bootstrap'

import SurveyQuestion from './../organisms/SurveyQuestion.jsx'

class SurveyQuestionPager extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      alerts: []
    }
  }

  incrementIndex() {
    try {
      this.isDone()
      this.setState({
        index: this.state.index += 1,
        alerts: []
      })
    }
    catch (error) {
      this.setState({
        alerts: error
      })
    }

  }

  decrementIndex() {
    if (this.state.index !== 0) {
      this.setState({
        index: this.state.index -= 1,
        alerts: []
      })
    }
  }

  shouldEnableDecrement() {
    return this.state.index !== 0
  }

  shouldEnableIncrement() {
    return this.state.index !== this.props.questions.length - 1
  }

  isDone() {
    const errors = []
    const currentQuestion = this.props.questions[this.state.index]
    if (!currentQuestion.selectedAnswer) {
      errors.push('Please select an answer')
    }
    if (!currentQuestion.intensity) {
      errors.push('How do you feel about this?')
    }
    if (errors.length) {
      throw errors
    }
  }

  isAnswered() {
    const currentQuestion = this.props.questions[this.state.index]
    return currentQuestion.selectedAnswer && currentQuestion.intensity
  }

  // Increment index, but skip input validation
  skipQuestion() {
    this.setState({
      index: this.state.index += 1,
      alerts: []
    })
  }

  nextPage() {
    browserHistory.push('/survey/results')
  }

  render() {

    const currentQuestion = this.props.questions[this.state.index]
    const remainingQuestionCount =
      this.props.questions.length - this.state.index

    return (
      <section>

        {
          this.state.alerts.map(alert => {
            return (
              <Alert bsStyle="warning">
                {alert}
              </Alert>
            )
          })
        }

        <SurveyQuestion
          question={currentQuestion}
          dispatch={this.props.dispatch} />

          <div style={{marginBottom: '2em'}}>
            <Button
              disabled={!this.shouldEnableDecrement.call(this)}
              onClick={this.decrementIndex.bind(this)}
              bsSize="large">Back</Button> {' '}
            <Button
              onClick={this.skipQuestion.bind(this)}
              bsSize="large">Skip</Button> {' '}
            <Button
              disabled={!this.shouldEnableIncrement.call(this)}
              onClick={this.incrementIndex.bind(this)}
              bsSize="large">Submit</Button>
          </div>

          {
            remainingQuestionCount === 1 && this.isAnswered() ?
              <Alert bsStyle="success">
                <span>OK, let's see your results</span>
                {' '}
                <Button
                  onClick={this.nextPage.bind(this)}
                  bsStyle="success">Next</Button>
              </Alert>
            :
              <Alert bsStyle="info">
                {
                  remainingQuestionCount === 1 ?
                    <span><b>Last question!</b></span>
                  :
                    <span><b>{remainingQuestionCount}</b> questions remaining</span>
                }
              </Alert>
          }

      </section>
    )
  }

}

SurveyQuestionPager.propTypes = {
  questions: PropTypes.array,
  dispatch: PropTypes.func
}

export default SurveyQuestionPager
