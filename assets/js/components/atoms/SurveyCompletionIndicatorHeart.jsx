import React, { PropTypes, Component } from 'react'

const heartStyle = {
  backgroundImage: 'url("/img/gray-heart.svg")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  height: 48,
  width: 52
}

class SurveyCompletionIndicatorHeart extends Component {

  getHeartSize(level) {
    level = String(level)
    switch (level) {
        case '1':
          return 0.5
        case '2':
          return 0.75
        case '3':
          return 1
        default:
          return 0.25
    }
  }

  render() {

    const scale = this.getHeartSize(this.props.level)

    const innerHeartStyle = Object.assign({}, heartStyle, {
      transition: 'all 2s',
      backgroundImage: 'url("/img/pink-heart.svg")',
      transform: `scale(${scale})`
    })

    return (
      <section style={heartStyle}>
        <div style={innerHeartStyle}></div>
      </section>
    )
  }

}

SurveyCompletionIndicatorHeart.propTypes = {
  level: PropTypes.number
}

export default SurveyCompletionIndicatorHeart
