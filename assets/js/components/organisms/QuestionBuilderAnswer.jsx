import React, { Component, PropTypes } from 'react'

import {
  Input,
  Button
} from 'react-bootstrap'

class QuestionBuilderAnswer extends Component {

  removeAnswerField(event) {
    this.props.removeAnswerField(this.props.id)
  }

  addAnswerField(event) {
    this.props.addAnswerField(this.props.answerText)
  }

  addAnswerFieldOnEnter(event) {
    if (!this.props.newAnswer) return
    if (event.key === 'Enter') {
      this.props.addAnswerField(this.props.answerText)
    }
  }

  render() {

    const button = this.props.newAnswer ?
      <Button
        onClick={this.addAnswerField.bind(this)}
        bsStyle="primary">Add Answer</Button>
      :
      <Button
        onClick={this.removeAnswerField.bind(this)}
        bsStyle="danger">Remove Answer</Button>

    return (
      <Input
        style={{display: 'flex'}}
        type="text"
        placeholder="Enter the text of the candidate's answer here."
        help={this.props.help}
        value={this.props.answerText}
        onChange={this.props.setAnswerText}
        onKeyPress={this.addAnswerFieldOnEnter.bind(this)}
        buttonAfter={button}/>
    )
  }
}

QuestionBuilderAnswer.propTypes = {
  id: PropTypes.number,
  answerText: PropTypes.string,
  help: PropTypes.string,
  setAnswerText: PropTypes.func,
  removeAnswerField: PropTypes.func,
  addAnswerField: PropTypes.func,
  newAnswer: PropTypes.bool
}

export default QuestionBuilderAnswer
