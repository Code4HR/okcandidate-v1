import React, { PropTypes, Component } from 'react'

import {
  ProgressBar,
  Button
} from 'react-bootstrap'

import colors from './../style/colors'
import { getMatchLevel } from './../utils/matchLevel'
import Card from './../atoms/Card.jsx'

const style = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1em'
  },
  innerRow: {
    display: 'flex',
    alignItems: 'center'
  },
  progress: {
    position: 'relative',
    color: 'black'
  },
  definitionList: {
    marginLeft: '.5em',
    marginBottom: 0
  },
  emoji: {
    fontSize: '2em',
    lineHeight: 1
  },
  text: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    textAlign: 'center'
  },
  cardStyle: {
    marginBottom: '1em',
    backgroundColor: colors.darkBlue,
    color: 'white',
    padding: '1em'
  }
}

import SurveyCompletionIndicatorHeart from './../atoms/SurveyCompletionIndicatorHeart.jsx'

class SurveyCompletionIndicator extends Component {

  getMatchLevel(answered, total) {
    return getMatchLevel(answered, total)
  }

  render() {

    const matchLevel = this.getMatchLevel(
      this.props.questionsAnswered,
      this.props.totalQuestions
    )

    const buttonText = this.props.resultsPage ?
                       'Improve Results' :
                       'Get Results'

    return (
      <Card style={style.cardStyle}>

        <div style={style.row}>
          <div style={style.innerRow}>
            <SurveyCompletionIndicatorHeart level={matchLevel.level} />
            <dl style={style.definitionList}>
              <dt>Match Level</dt>
              <dd style={style.emoji}>{matchLevel.mood}</dd>
            </dl>
          </div>
          <div>
            <Button
              disabled={matchLevel.level < 1}
              onClick={this.props.onSubmit}
              bsStyle="primary">{buttonText}</Button>
          </div>
        </div>

        <section style={style.progress}>
          <ProgressBar style={{marginBottom: 0}} bsStyle="info" now={matchLevel.progress} />
          <span style={style.text}>{matchLevel.text}</span>
        </section>

      </Card>
    )

  }

}

SurveyCompletionIndicator.propTypes = {
  onSubmit: PropTypes.func,
  questionsAnswered: PropTypes.number,
  totalQuestions: PropTypes.number,
  resultsPage: PropTypes.bool
}

export default SurveyCompletionIndicator
