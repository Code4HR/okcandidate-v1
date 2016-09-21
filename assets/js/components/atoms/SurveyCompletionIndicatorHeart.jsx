import React, { PropTypes, Component } from 'react'

const style = {
  outerHeart: {
    backgroundImage: 'url("/img/gray-heart.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 48,
    width: 52,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerHeart: {
    transition: 'height 2s, width 2s',
    backgroundImage: 'url("/img/pink-heart.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 24,
    width: 24
  }
}

class SurveyCompletionIndicatorHeart extends Component {

  getHeartSize(level) {
    level = String(level)
    switch (level) {
        case '1':
          return [24, 26]
        case '2':
          return [36, 38]
        case '3':
          return [48, 52]
        default:
          return [12, 14]
    }
  }

  render() {

    const lengths = this.getHeartSize(this.props.level)

    style.innerHeart = Object.assign({}, style.innerHeart, {
      height: lengths[0],
      width: lengths[1]
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
