import React, { PropTypes, Component } from 'react'
import CandidateMatchQuestion from './../organisms/CandidateMatchQuestion.jsx'

class CandidateMatchCategory extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        <h6>{this.props.categoryName}</h6>
        <dl>
          <dt>Category Match</dt>
          <dd>{this.props.categoryMatch}</dd>
        </dl>
        <h6>Questions</h6>
        {
          this.props.questions.map((question, index) => {
            return (
              <CandidateMatchQuestion
                key={index}
                questionText={question.questionText}
                voterAnswerText={question.voterAnswerText}
                candidateAnswerLabel={question.candidateAnswerLabel} />
            )
          })
        }
      </section>
    )
  }

}

CandidateMatchCategory.propTypes = {
  categoryName: PropTypes.string,
  categoryMatch: PropTypes.string,
  questions: PropTypes.array
}

export default CandidateMatchCategory
