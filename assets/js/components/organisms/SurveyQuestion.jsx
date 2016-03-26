import React, { Component, PropTypes } from 'react'
import Rating from 'react-rating'

import {
  Well,
  Input
} from 'react-bootstrap'

import {
  selectSurveyQuestionResponseIntensity,
  selectSurveyQuestionResponse
} from './../../redux/survey/survey-actions'

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
      <section>
        {
          <Well>
            <label>{this.props.question.questionText}</label>
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
            <Rating
              initialRate={this.props.question.intensity}
              onChange={this.setRating.bind(this)} />
          </Well>
        }
      </section>
    )
  }
}

SurveyQuestion.propTypes = {
  question: PropTypes.object,
  dispatch: PropTypes.func
}

export default SurveyQuestion
