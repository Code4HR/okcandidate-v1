import React, { Component, PropTypes } from 'react'
import {
  Alert
} from 'react-bootstrap'

class SurveyQuestionCounter extends Component {

  render() {

    const remainingQuestionCount = this.props.total - this.props.index

    return (
      <Alert bsStyle="info">
        {
          remainingQuestionCount === 1 ?
            <span ref="text"><b>Last question!</b></span>
          :
            <span ref="text"><b>{remainingQuestionCount}</b> questions remaining</span>
        }
      </Alert>
    )
  }

}

SurveyQuestionCounter.propTypes = {
  index: PropTypes.number,
  total: PropTypes.number
}

export default SurveyQuestionCounter
