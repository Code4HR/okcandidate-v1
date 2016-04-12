import React, { PropTypes, Component } from 'react'

import CandidateMatchProfileBadge from './../molecules/CandidateMatchProfileBadge.jsx'

import CandidateMatchCategory from './../organisms/CandidateMatchCategory.jsx'
import Card from './../atoms/Card.jsx'

class CandidateMatchCandidate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showCategory: false
    }
  }

  render() {
    return (
      <Card style={{marginBottom: '1em'}}>
        <CandidateMatchProfileBadge
          candidateName={this.props.candidateName}
          compositeMatchScore={this.props.compositeMatchScore} />

        {
          this.state.showCategory ?
          this.props.categoryMatchScores.map((category, index) => {
            return (
              <CandidateMatchCategory
                key={index}
                categoryName={category.categoryName}
                categoryMatch={category.categoryMatch}
                questions={category.questions} />
            )
          })
          :
          null
        }

      </Card>
    )
  }

}

CandidateMatchCandidate.propTypes = {
  candidateName: PropTypes.string,
  compositeMatchScore: PropTypes.string,
  categoryMatchScores: PropTypes.array
}

export default CandidateMatchCandidate
