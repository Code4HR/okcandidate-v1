import React, { Component, PropTypes } from 'react'

import {
  Input,
  Button
} from 'react-bootstrap'

class QuestionBuilderAnswer extends Component {

  removeAnswerField(event) {
    this.props.remove(this.props.id)
  }

  addAnswerField(event) {
    this.props.add(event.target.value)
  }

  addAnswerFieldOnEnter(event) {
    if (!this.props.newAnswer) return
    if (event.key === 'Enter') {
      this.props.add(event.target.value)
    }
  }

  render() {

    const button = this.props.newAnswer ?
      <Button
        onClick={this.addAnswerField.bind(this)}
        bsStyle="primary">Submit</Button>
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
        value={this.props.text}
        onChange={this.props.onChange}
        onKeyPress={this.addAnswerFieldOnEnter.bind(this)}
        buttonAfter={button}/>
    )
  }
}

QuestionBuilderAnswer.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  help: PropTypes.string,
  onChange: PropTypes.func,
  remove: PropTypes.func,
  add: PropTypes.func,
  addAnswerField: PropTypes.func,
  newAnswer: PropTypes.bool
}

export default QuestionBuilderAnswer
