import React, { Component, PropTypes } from 'react'

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

  // Increment index, but skip input validation
  skipQuestion() {
    this.setState({
      index: this.state.index += 1,
      alerts: []
    })
  }

  render() {

    const currentQuestion = this.props.questions[this.state.index]

    return (
      <section>

        {this.state.alerts.map(alert => {
          return (
            <Alert bsStyle="warning">
              {alert}
            </Alert>
          )
        })}

        <SurveyQuestion
          question={currentQuestion}
          dispatch={this.props.dispatch} />

          <label>Question { this.state.index + 1 }{'/'}{ this.props.questions ? this.props.questions.length : null }</label>

          <div>
            <Button
              disabled={!this.shouldEnableDecrement.call(this)}
              onClick={this.decrementIndex.bind(this)}
              bsSize="large">Back</Button> {' '}
            <Button
              onClick={this.skipQuestion.bind(this)}
              bsSize="large">Skip</Button> {' '}
            <Button
              disabled={!this.shouldEnableIncrement.bind(this)}
              onClick={this.incrementIndex.bind(this)}
              bsSize="large">Next</Button>
          </div>

      </section>
    )
  }

}

SurveyQuestionPager.propTypes = {
  questions: PropTypes.array,
  dispatch: PropTypes.func
}

export default SurveyQuestionPager
