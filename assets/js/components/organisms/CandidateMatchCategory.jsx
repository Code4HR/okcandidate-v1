import React, { PropTypes, Component } from 'react'
import { Panel, Label } from 'react-bootstrap'

class CandidateMatchCategory extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Panel>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h5 style={{flexGrow: 1}}>
            {this.props.categoryName}
          </h5>
          <Label bsStyle="danger">
            {this.props.categoryMatch}%
          </Label>
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
