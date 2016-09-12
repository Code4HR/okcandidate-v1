import React, { Component, PropTypes } from 'react'

import CandidateMatchPicture from './../atoms/CandidateMatchPicture.jsx'
import CandidateMatchRating from './../atoms/CandidateMatchRating.jsx'

const style = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  badge: {

  },
  label: {
    fontSize: '1.25em',
    margin: '0 0 .25em 0'
  }
}

class CandidateMatchProfileBadge extends Component {
  get containerStyle() {
    return Object.assign({}, style.container, this.props.style)
  }

  render() {

    return (
      <section style={this.containerStyle}>
        <CandidateMatchPicture candidateName={this.props.candidateName} />
        <div style={{marginLeft: '1em'}}>
          <h3 style={style.label}>{this.props.candidateName}</h3>
          <CandidateMatchRating
            compositeMatchScore={this.props.compositeMatchScore}
            style={style.badge} />
        </div>
      </section>
    )
  }

}

CandidateMatchProfileBadge.propTypes = {
  compositeMatchScore: PropTypes.number,
  candidateName: PropTypes.string,
  style: PropTypes.object
}

export default CandidateMatchProfileBadge
