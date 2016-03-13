import React, { Component, PropTypes } from 'react'

import {
  setQuestionText,
  addAnswerField,
  removeAnswerField,
  setNewAnswerText,
  setAnswerText,
  submitQuestion
} from './../../redux/admin/question-builder/question-builder-actions'

import {
  Input,
  Button,
  Alert
} from 'react-bootstrap'

import QuestionBuilderAnswer from './../organisms/QuestionBuilderAnswer.jsx'

class QuestionBuilder extends Component {

  constructor(props) {
    super(props)
  }

  setQuestion(event) {
    this.props.dispatch(setQuestionText(event.target.value))
  }

  setAnswerText(id, text) {
    this.props.dispatch(setAnswerText(id, text))
  }

  setNewAnswerText(event) {
    this.props.dispatch(setNewAnswerText(event.target.value))
  }

  addAnswerField(text) {
    this.props.dispatch(addAnswerField(text))
  }

  removeAnswerField(id) {
    this.props.dispatch(removeAnswerField(id))
  }

  submitQuestion() {
    this.props.dispatch(submitQuestion())
  }

  render() {
    return (
      <section>
        <h2>Question Builder</h2>

        {
          this.props.questionBuilder.alerts.map(alert => {
            return (
              <Alert
                bsStyle={alert.severity}>{alert.text}</Alert>
            )
          })
        }

        <Input
          type="text"
          value={this.props.questionBuilder.question.value}
          placeholder="Enter the question here"
          onChange={this.setQuestion.bind(this)} />

        {
          this.props.questionBuilder.answers.map(answer => {
            return (
              <QuestionBuilderAnswer
                answerText={answer.text}
                setAnswerText={this.setAnswerText.bind(this)}
                removeAnswerField={this.removeAnswerField.bind(this)}
                id={answer.id}
                key={answer.id} />
            )
          })
        }

        <QuestionBuilderAnswer
          newAnswer
          answerText={this.props.questionBuilder.newAnswer.value}
          help={this.props.questionBuilder.newAnswer.help}
          addAnswerField={this.addAnswerField.bind(this)}
          setAnswerText={this.setNewAnswerText.bind(this)} />

        <Button
          onClick={this.submitQuestion.bind(this)}
          bsStyle="primary">Submit</Button>

      </section>
    )
  }
}

QuestionBuilder.propTypes = {
  questionBuilder: PropTypes.object,
  dispatch: PropTypes.func
}

export default QuestionBuilder
