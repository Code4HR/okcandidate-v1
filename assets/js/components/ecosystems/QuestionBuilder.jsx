import React, { Component, PropTypes } from 'react'

import {
  Input,
  Button,
  Alert
} from 'react-bootstrap'

import QuestionBuilderAnswer from './../organisms/QuestionBuilderAnswer.jsx'

class QuestionBuilder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questionText: { value: this.props.question.questionText },
      answers: this.props.question.answers,
      newAnswer: {}
    }
  }

  setQuestion(event) {
    this.setState({
      questionText: { value: event.target.value }
    })
  }

  setNewAnswer(event) {
    this.setState({
      newAnswer: { value: event.target.value }
    })
  }

  setAnswer(id, event) {
    const state = Object.assign({}, this.state, {
      answers: this.state.answers.map(answer => {
        if (answer.id === id) {
          answer.answerLabel = event.target.value
        }
        return answer
      })
    })
    this.setState(state)
  }

  removeAnswerField(id) {
    const state = Object.assign({}, this.state, {
      answers: this.state.answers.filter(answer => {
        return answer.id !== id
      })
    })
    this.setState(state)
  }

  addAnswerField(answer) {
    const state = Object.assign({}, this.state, {
      answers: [
        ...this.state.answers,
        { answerLabel: answer, id: this.state.answers.length + 1}
      ]
    })
    this.setState(state)
  }

  submitQuestion(id) {
    // Update the question object, make an API call, untoggle editable state.
    this.props.submitQuestion({
      id: this.props.id,
      questionText: this.state.questionText,
      answers: this.state.answers
    })
  }

  render() {
    return (
      <section>

        <label>Question</label>
        <Input
          type="text"
          value={this.state.questionText.value}
          placeholder="Enter the question here"
          onChange={this.setQuestion.bind(this)} />

        <label>Enter a New Answer</label>

        <QuestionBuilderAnswer
          newAnswer
          text={this.state.newAnswer.value}
          help={this.state.newAnswer.help}
          add={this.addAnswerField.bind(this)}
          onChange={this.setNewAnswer.bind(this)} />

        <label>Answers</label>

        {
          this.state.answers.map(answer => {
            return (
              <QuestionBuilderAnswer
                text={answer.answerLabel}
                onChange={this.setAnswer.bind(this, answer.id)}
                remove={this.removeAnswerField.bind(this, answer.id)}
                id={answer.id}
                key={answer.id} />
            )
          })
        }

        <Button
          onClick={this.submitQuestion.bind(this)}
          bsStyle="primary">Submit</Button>

      </section>
    )
  }
}

QuestionBuilder.propTypes = {
  id: PropTypes.number,
  toggleEditable: PropTypes.func,
  submitQuestion: PropTypes.func,
  question: PropTypes.object,
  dispatch: PropTypes.func
}

export default QuestionBuilder
