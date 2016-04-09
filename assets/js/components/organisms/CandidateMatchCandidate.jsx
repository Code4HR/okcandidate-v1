import React, { PropTypes, Component } from 'react'
import CandidateMatchCategory from './../organisms/CandidateMatchCategory.jsx'

class CandidateMatchCandidate extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        <h4>{this.props.candidateName}</h4>
        <dl>
          <dt>Match</dt>
          <dd>{this.props.compositeMatchScore}</dd>
        </dl>
        <h5>Categories</h5>
        {
          this.props.categoryMatchScores.map((category, index) => {
            return (
              <CandidateMatchCategory
                key={index}
                categoryName={category.categoryName}
                categoryMatch={category.categoryMatch}
                questions={category.questions} />
            )
          })
        }
      </section>
    )
  }

}

CandidateMatchCandidate.propTypes = {
  candidateName: PropTypes.string,
  compositeMatchScore: PropTypes.string,
  categoryMatchScores: PropTypes.array
}

export default CandidateMatchCandidate
