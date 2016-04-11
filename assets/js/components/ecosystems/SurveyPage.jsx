import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

import SurveyQuestionPager from './../ecosystems/SurveyQuestionPager.jsx'

import {
  fetchActiveSurveys,
  submitSurveyAnswers
} from './../../redux/survey/survey-actions'

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
        return question.id === response.questionId
      })
      if (answer) {
        question.intensity = answer.intensity
        question.selectedAnswer = answer.answerId
      }
      return question
    })
  }

  submit() {
    this.props.dispatch(
      submitSurveyAnswers(this.props.survey.responses)
    )
  }

  render() {

    const questions = this.blendQuestionsAndReponses(
      this.props.survey.questions,
      this.props.survey.responses
    )

    return (
      <article>
        <div className="container">
          {
            !this.props.survey.isFetching && questions.length ?
              <SurveyQuestionPager
                onSubmit={this.submit.bind(this)}
                questions={questions}
                dispatch={this.props.dispatch} />
            :
            <p>Loading Questions</p>
          }
        </div>
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
