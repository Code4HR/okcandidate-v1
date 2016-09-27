import React, { PropTypes, Component } from 'react'

import {
  ProgressBar,
  Button
} from 'react-bootstrap'

import colors from './../style/colors'
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

    const third = total / 3 % 1 === 0 ? total / 3 : Math.round(total / 3)

    const result = {
      level: 0,
      mood: ':(',
      text: `Answer ${third - answered % third} questions for an OK rating`,
      progress: Math.round(answered % third / third * 100)
    }

    if (answered >= third && answered < (2 * third)) {
      return Object.assign({}, result, {
        level: 1,
        mood: 'OK!',
        text: `Answer ${third - answered % third} questions for a good rating`
      })
    }

    else if (answered >= (2 * third) && answered < total) {
      return Object.assign({}, result, {
        level: 2,
        mood: 'Good!',
        text: `Answer ${total - answered} questions for the best rating`
      })
    }

    else if (answered === total) {
      return Object.assign({}, result, {
        level: 3,
        mood: 'Best!',
        text: 'Good to go!',
        progress: 100
      })
    }

    else {
      return result
    }
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
