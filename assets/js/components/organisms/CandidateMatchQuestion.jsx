import React, { PropTypes, Component } from 'react'

class CandidateMatchQuestion extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        <h6>{this.props.questionText}</h6>
        <div>
          <label>Your Answer</label>
          <p>{this.props.voterAnswerText}</p>
        </div>
        <div>
          <label>Their Answer</label>
          <p>{this.props.candidateAnswerLabel}</p>
        </div>
      </section>
    )
  }

}

CandidateMatchQuestion.propTypes = {
  questionText: PropTypes.string,
  voterAnswerText: PropTypes.string,
  candidateAnswerLabel: PropTypes.string
}

export default CandidateMatchQuestion
