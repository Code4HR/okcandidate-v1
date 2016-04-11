import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'

import {
  fetchSurveyCandidateMatches
} from './../../redux/survey/survey-actions'

import CandidateMatchCandidate from './../organisms/CandidateMatchCandidate.jsx'

class ResultsPage extends Component {

  constructor(props) {
    super(props)

    this.props.dispatch(fetchSurveyCandidateMatches(
      this.props.params.id
    ))

  }

  render() {
    return (
      <article className="container">
        <h1>Matches</h1>
        {
          this.props.survey.candidateMatch.survey &&
          this.props.survey.candidateMatch.survey.map((race, index) => {
            return (
              <section key={index}>
                <h2>{race.candidateTypeName}</h2>
                {
                  race.candidates.map((candidate, index) => {
                    return (
                      <CandidateMatchCandidate
                        key={index}
                        candidateName={candidate.candidateName}
                        compositeMatchScore={candidate.compositeMatchScore}
                        categoryMatchScores={candidate.categoryMatchScores} />
                    )
                  })
                }
              </section>
            )
          })
        }

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
