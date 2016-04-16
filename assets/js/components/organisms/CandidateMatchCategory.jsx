import React, { PropTypes, Component } from 'react'
import { Panel } from 'react-bootstrap'

import CandidateMatchRating from '../atoms/CandidateMatchRating.jsx'

const style = {
  panel: {
    // border: 'none',
    // boxShadow: 'none',
    marginBottom: '.5em',
    // paddingLeft: 0,
    // paddingRight: 0,
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
