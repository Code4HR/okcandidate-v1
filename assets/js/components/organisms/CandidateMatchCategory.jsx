import React, { PropTypes, Component } from 'react'
import { Panel } from 'react-bootstrap'

import CandidateMatchRating from '../atoms/CandidateMatchRating.jsx'

class CandidateMatchCategory extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Panel style={{paddingTop: '0px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4 style={{flexGrow: 1}}>
            {this.props.categoryName}
          </h4>
          <CandidateMatchRating
            compositeMatchScore={this.props.categoryMatch} />
        </div>
      </Panel>
    )
  }
}

CandidateMatchCategory.propTypes = {
  categoryName: PropTypes.string,
  categoryMatch: PropTypes.string,
  questions: PropTypes.array
}

export default CandidateMatchCategory
