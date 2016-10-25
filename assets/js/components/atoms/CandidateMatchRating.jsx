import React, { Component, PropTypes } from 'react'

import colors from './../style/colors'

const style = {
  container: {
    background: colors.red,
    padding: '0 1em',
    maxWidth: '7em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '1em',
    margin: 0
  },
  score: {
    fontSize: '1em',
    fontWeight: 700,
    margin: 0,
    lineHeight: '.75em'
  },
  label: {
    fontSize: '1em',
    padding: '.5em'
  }
}

class CandidateMatchRating extends Component {

  constructor(props) {
    super(props)
  }

  get colour() {
    const match = this.props.compositeMatchScore
    if (match >= 80) {
      return colors.green
    }
    if (match < 80 && match >= 60) {
      return colors.yellow
    }
    if (match < 60 && match >= 50) {
      return colors.orange
    }
    else {
      return colors.red
    }
  }

  getContainerStyle() {
    return Object.assign({}, style.container, this.props.style,
      { background: this.colour })
  }

  render() {

    return (
      <dl style={this.getContainerStyle.call(this)}>
        <dd style={style.score}>{this.props.compositeMatchScore}%</dd>
        <dt style={style.label}>Match</dt>
      </dl>
    )
  }

}

CandidateMatchRating.propTypes = {
  compositeMatchScore: PropTypes.number,
  style: PropTypes.object
}

export default CandidateMatchRating
