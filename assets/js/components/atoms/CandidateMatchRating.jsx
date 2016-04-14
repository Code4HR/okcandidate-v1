import React, { Component, PropTypes } from 'react'

import colors from './../style/colors'

const style = {
  container: {
    background: colors.red,
    padding: '.25em 1em',
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
    marginLeft: '.5em'
  }
}

class CandidateMatchRating extends Component {

  constructor(props) {
    super(props)
  }

  get colour() {
    const thresholds = [
        { level: 80, colour: 'yellow' },
        { level: 60, colour: 'orange' },
        { level: 50, colour: colors.red}
      ], match = parseInt(this.props.compositeMatchScore)
    return thresholds.reduce((colour, threshold) =>
      match < threshold.level ?
        threshold.colour :
        colour, 'green')
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
  compositeMatchScore: PropTypes.string,
  style: PropTypes.object
}

export default CandidateMatchRating
