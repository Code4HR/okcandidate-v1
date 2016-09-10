import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router'

import {
  Button, ButtonToolbar
} from 'react-bootstrap'

import Card from './../atoms/Card.jsx'
import SurveyQuestion from './../organisms/SurveyQuestion.jsx'
import SurveyQuestionCounter from './../molecules/SurveyQuestionCounter.jsx'

const style = {
  buttonTray: {
    container: {
      display: 'flex'
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

  skipForward() {
    this.goForward()
  }

  answerForward() {
    try {
      this.validateSelections()
      this.goForward()
    }
    catch (errors) {
      this.setState({
        alerts: errors
      })
    }
  }

  goForward() {
    this.state.alerts = {}
    if (this.state.index < this.props.questions.length - 1) {
      this.incrementIndex()
    }
    else {
      this.props.onSubmit()
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

  validateSelections() {
    const errors = {}
    const currentQuestion = this.props.questions[this.state.index]

    if (!currentQuestion.selectedAnswer) {
      errors.answer = 'Please select an answer'
    } else if (!currentQuestion.intensity) {
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

        <SurveyQuestionCounter
          index={this.state.index}
          total={this.props.questions.length} />

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
                bsSize="large">Back</Button> {' '}

              <div style={style.buttonTray.spacer}></div>

              <ButtonToolbar>
                <Button
                  ref="skipButton"
                  bsStyle="warning"
                  bsSize="large"
                  onClick={this.skipForward.bind(this)}>Skip</Button>

                <Button
                  ref="nextButton"
                  bsStyle="primary"
                  bsSize="large"
                  onClick={this.answerForward.bind(this)}>Next</Button>
              </ButtonToolbar>
            </div>
        </Card>

      </section>
    )
  }

}

SurveyQuestionPager.propTypes = {
  onSubmit: PropTypes.func,
  questions: PropTypes.array,
  dispatch: PropTypes.func
}

export default SurveyQuestionPager
