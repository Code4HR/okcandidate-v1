import React, { Component, PropTypes } from 'react'
import Rating from 'react-rating'

import {
  Input,
  Alert
} from 'react-bootstrap'

import {
  selectSurveyQuestionResponseIntensity,
  selectSurveyQuestionResponse
} from './../../redux/survey/survey-actions'

const style = {
  header: {
    fontSize: '1.5em',
    marginTop: '0'
  }
}

class SurveyQuestion extends Component {

  makeSelection(answer) {
    this.props.dispatch(
      selectSurveyQuestionResponse(
        this.props.question.id,
        answer
      )
    )
  }

  setRating(rating) {
    this.props.dispatch(
      selectSurveyQuestionResponseIntensity(
        this.props.question.id,
        rating
      )
    )
  }

  getChecked(answer) {
    return this.props.question.selectedAnswer === answer.id
  }

  render() {
    return (
      <section style={this.props.style}>
        <h1 style={style.header}>{this.props.question.questionText}</h1>
        {
          this.props.alerts.answer ?
            <Alert ref="answer-alert" bsStyle="warning">
              <span>Please select an answer.</span>
            </Alert>
          :
            null
        }
        {
          this.props.question.answers.map(answer => {
            return (
              <Input
                checked={this.getChecked.call(this, answer)}
                onClick={this.makeSelection.bind(this, answer)}
                type="radio"
                label={answer.answerLabel} />
            )
          })
        }
        <label>How strongly do you feel about this?</label><br />
        {
          this.props.alerts.intensity ?
            <Alert ref="intensity-alert" bsStyle="warning">
              <span>Please select an intensity.</span>
            </Alert>
          :
            null
        }
        <Rating
          initialRate={this.props.question.intensity}
          empty="glyphicon glyphicon-heart-empty"
          full="glyphicon glyphicon-heart"
          onChange={this.setRating.bind(this)} />
      </section>
    )
  }
}

SurveyQuestion.propTypes = {
  question: PropTypes.object,
  alerts: PropTypes.object,
  dispatch: PropTypes.func,
  style: PropTypes.object
}

export default SurveyQuestion
