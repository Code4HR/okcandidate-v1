import React, { Component, PropTypes } from 'react'

import {
  Input
} from 'react-bootstrap'

import {
  fetchActiveSurveys
} from './../../redux/admin/survey-builder/survey-builder-actions'

class SurveyBuilder extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchActiveSurveys())
  }

  selectSurvey(event) {
    // this may not actually see any action until there is more than
    // one survey to select.
  }

  render() {
    return (
      <section>
        <Input
          type="select"
          label="Select Campaign"
          placeholder="Active Campaign"
          onChange={this.selectSurvey.bind(this)}>
          {
            this.props.surveyBuilder.activeSurveys.map(survey => {
              return (
                <option value={survey.id}>{survey.surveyName}</option>
              )
            })
          }
        </Input>

        {
          this.props.surveyBuilder.questions.map(question => {
            return <pre>Question!</pre>
          })
        }

      </section>
    )
  }
}

SurveyBuilder.propTypes = {
  surveyBuilder: PropTypes.object,
  dispatch: PropTypes.func
}

export default SurveyBuilder
