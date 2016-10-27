import React, { PropTypes, Component } from 'react'
import { Panel } from 'react-bootstrap'

import CandidateMatchRating from '../atoms/CandidateMatchRating.jsx'

const style = {
  panel: {
    marginBottom: '.5em',
    marginLeft: -15,
    marginRight: -15
  }
}

class CandidateMatchCategory extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Panel style={style.panel}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4 style={{flexGrow: 1, fontSize: 14}}>
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
  categoryMatch: PropTypes.number,
  questions: PropTypes.array
}

export default CandidateMatchCategory
