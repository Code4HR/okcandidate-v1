import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
const ReactGA = require('react-ga')

import {
  fetchSurveyCandidateMatches
} from './../../redux/survey/survey-actions'

import {
  Col,
  Grid,
  Row
} from 'react-bootstrap'

import CandidateMatchCandidate from './../organisms/CandidateMatchCandidate.jsx'
import SurveyCompletionIndicator from './../organisms/SurveyCompletionIndicator.jsx'
import ElectionDayReminder from './../ecosystems/ElectionDayReminder.jsx'
import LoadingIndicator from './../atoms/LoadingIndicator.jsx'

class ResultsPage extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.dispatch(fetchSurveyCandidateMatches(this.props.params.id))

    ReactGA.event({
      category: 'Survey',
      action: 'Viewed Results'
    })
  }

  sortRaces(races) {
    return _.sortBy(races, race => {
      return race.candidateTypeName
    })
  }

  sortCandidates(candidates) {
    return _.sortBy(candidates, candidate => {
      return candidate.compositeMatchScore
    }).reverse()
  }

  backToSurvey() {
    browserHistory.push('/survey')
  }

  render() {
    const survey = this.props.survey,
      races = survey.candidateMatch.survey
    return (
      <article>
        <Grid>
          <Row>
            <Col xs={12} sm={8} smOffset={2}>

              {
                !this.props.survey.candidateMatch.hasContactInfo &&
                <ElectionDayReminder
                  electionDayReminder={this.props.survey.electionDayReminder}
                  surveyId={this.props.survey.surveyResponseId}
                  dispatch={this.props.dispatch} />
              }

              {
                (this.props.survey.responses.length && this.props.survey.questions.length) !== 0 &&
                <SurveyCompletionIndicator
                  questionsAnswered={this.props.survey.responses.length}
                  totalQuestions={this.props.survey.questions.length}
                  resultsPage
                  onSubmit={this.backToSurvey.bind(this)} />
              }

              <h1>Matches</h1>
              {
                survey.isFetching || (races && races.length === 0) ?
                  <LoadingIndicator message="Loading Matches" /> :
                  this.sortRaces(races).map((race, index) => {
                    return (
                      <section key={index}>
                        <h2 style={{fontSize: 18}}>{race.candidateTypeName}</h2>
                        {
                          this.sortCandidates(race.candidates)
                            .map((candidate, index) => {
                              return (
                                <CandidateMatchCandidate
                                  key={index}
                                  candidateName={candidate.candidateName}
                                  candidateWebsite={candidate.candidateWebsite}
                                  compositeMatchScore={candidate.compositeMatchScore}
                                  categoryMatchScores={candidate.categoryMatchScores} />
                              )
                            })
                        }
                      </section>
                    )
                  })
              }
            </Col>
          </Row>
        </Grid>
      </article>
    )
  }
}

ResultsPage.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  survey: PropTypes.object
}

export default connect(
  state => ({
    survey: state.survey
  })
)(ResultsPage)
