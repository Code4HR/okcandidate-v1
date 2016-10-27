import React, { PropTypes, Component } from 'react'

import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import _ from 'lodash'

import {
  fetchSurveyCandidateMatches
} from './../../redux/survey/survey-actions'

import {
  Col,
  Grid,
  Row,
  Alert,
  Button
} from 'react-bootstrap'

import CandidateMatchCandidate from './../organisms/CandidateMatchCandidate.jsx'
import LoadingIndicator from './../atoms/LoadingIndicator.jsx'

class VoterCard extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchSurveyCandidateMatches(this.props.params.id))

    ReactGA.event({
      category: 'Survey',
      action: 'Viewed Voter Card'
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

  showAllResults() {
    this.props.history.push(`/results/${this.props.params.id}`)
  }

  render() {

    const survey = this.props.survey
    const races = survey.candidateMatch.survey

    return (
      <article>
        <Grid>
          <Row>
            <Col xs={12} sm={8} smOffset={2}>

              <h1>Voter Card</h1>

              <Alert bsStyle="success">
                <div style={{marginBottom: '.5em'}}>
                  This page displays your best matches for each race.  Click below
                  to view all your matches.
                </div>
                <Button
                  bsStyle="success"
                  onClick={this.showAllResults.bind(this)}
                  >All Results</Button>
              </Alert>

              {
                survey.isFetching || (races && races.length === 0) &&
                <LoadingIndicator message="Loading Voting Card" />
              }

              {
                this.sortRaces(races).map((race, index) => {
                  return (
                    <section key={index}>
                      <h2>{race.candidateTypeName}</h2>
                      {
                        (() => {
                          const match = this.sortCandidates(race.candidates)[0]
                          return (
                            <CandidateMatchCandidate
                              candidateName={match.candidateName}
                              candidateWebsite={match.candidateWebsite}
                              compositeMatchScore={match.compositeMatchScore}
                              categoryMatchScores={match.categoryMatchScores} />
                          )
                        })()
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

VoterCard.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
  params: PropTypes.object,
  survey: PropTypes.object
}

export default connect(
  state => ({
    survey: state.survey
  })
)(VoterCard)
