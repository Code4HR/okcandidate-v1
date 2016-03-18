import React, { Component, PropTypes } from 'react'

import {
  Well,
  Button
} from 'react-bootstrap'

import QuestionBuilder from './../ecosystems/QuestionBuilder.jsx'

class SurveyBuilderQuestion extends Component {

  render() {
    return (
      <section>
        {
          this.props.question.editable ?
          <Well>
            <QuestionBuilder
              id={this.props.id}
              submitQuestion={this.props.submitQuestion}
              question={this.props.question} />
          </Well>
          :
          <Well>
            <h3>{this.props.question.questionText}</h3>
            <ul>
              {
                this.props.question.answers.map(answer => {
                  return (
                    <li>{answer.answerLabel}</li>
                  )
                })
              }
            </ul>
            <Button
              onClick={this.props.toggleEditable.bind(this, this.props.question)}
              bsStyle="primary">Edit</Button>
          </Well>
        }
      </section>
    )
  }
}

SurveyBuilderQuestion.propTypes = {
  id: PropTypes.id,
  question: PropTypes.object,
  submitQuestion: PropTypes.func,
  editable: PropTypes.bool,
  toggleEditable: PropTypes.func
}

export default SurveyBuilderQuestion
