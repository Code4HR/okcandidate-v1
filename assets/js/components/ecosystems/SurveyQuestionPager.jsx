import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router'

import {
  Button
} from 'react-bootstrap'

import Card from './../atoms/Card.jsx'
import SurveyQuestion from './../organisms/SurveyQuestion.jsx'
import SurveyQuestionCounter from './../molecules/SurveyQuestionCounter.jsx'
import SurveyQuestionCategory from './../organisms/SurveyQuestionCategory.jsx'
import SurveyQuestionCategoryPager from './../organisms/SurveyQuestionCategoryPager.jsx'

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

  goForward() {
    try {
      this.validateSelections()
      this.state.alerts = {}
      if (this.state.index < this.props.questions.length - 1) {
        this.incrementIndex()
      }
      else {
        this.props.onSubmit()
      }
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

        <SurveyQuestionCounter
          index={this.state.index}
          total={this.props.questions.length} />

<<<<<<< HEAD
        <SurveyQuestionCategory />
=======
        <SurveyQuestionCategoryPager
          categories={this.props.categories}
          question={currentQuestion}
          setIndex={this.setIndex.bind(this)}
          dispatch={this.props.categories} />
>>>>>>> a45f4d5b8ca3c9b004e6b3aaddc787273d1f1323

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

              <Button
                ref="nextButton"
                bsStyle="primary"
                bsSize="large"
                onClick={this.goForward.bind(this)}>Next</Button>
            </div>
        </Card>

      </section>
    )
  }

}

SurveyQuestionPager.propTypes = {
  onSubmit: PropTypes.func,
  questions: PropTypes.array,
  categories: PropTypes.array,
  dispatch: PropTypes.func
}

export default SurveyQuestionPager
