import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

import SurveyQuestion from './../organisms/SurveyQuestion.jsx'

import {
  fetchActiveSurveys
} from './../../redux/survey/survey-actions'

import {
  Button
} from 'react-bootstrap'

class SurveyPage extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchActiveSurveys())
  }

  blendQuestionsAndReponses(questions, responses) {
    return questions.map(question => {
      const answer = responses.find(response => {
        return question.id === response.question_id
      })
      if (answer) {
        question.selectedAnswer = answer.answer_id
      }
      return question
    })
  }

  submit() {
    this.props.dispatch()
  }

  render() {
    return (
      <article>

        {
          this.blendQuestionsAndReponses(
            this.props.survey.questions,
            this.props.survey.responses
          ).map(question => {
            return (
              <SurveyQuestion
                question={question}
                dispatch={this.props.dispatch} />
            )
          })
        }

        <Button
          onClick={this.submit.bind(this)}
          bsStyle="primary"
          bsSize="large">Submit</Button>

      </article>
    )
  }
}

SurveyPage.propTypes = {
  survey: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    survey: state.survey
  })
)(SurveyPage)
