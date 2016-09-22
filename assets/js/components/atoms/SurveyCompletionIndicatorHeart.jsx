import React, { PropTypes, Component } from 'react'

const style = {
  outerHeart: {
    backgroundImage: 'url("/img/gray-heart.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 48,
    width: 52
  },
  innerHeart: {
    transition: 'all 2s ease-in-out',
    backgroundImage: 'url("/img/pink-heart.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 48,
    width: 52
  }
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

    style.innerHeart = Object.assign({}, style.innerHeart, {
      transform: `scale(${scale})`
    })

    return (
      <section style={style.outerHeart}>
        <div style={style.innerHeart}></div>
      </section>
    )
  }

}

SurveyCompletionIndicatorHeart.propTypes = {
  level: PropTypes.number
}

export default SurveyCompletionIndicatorHeart
