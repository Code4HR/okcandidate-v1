import React, { Component, PropTypes } from 'react'

import colors from './../style/colors'

const style = {
  container: {
    borderRadius: '100%',
    width: 72,
    height: 72,
    background: colors.lightBlue
  }
}

class CandidatePicture extends Component {

  render() {
    return (
      <section style={style.container}>

      </section>
    )
  }

}

CandidatePicture.propTypes = {}

export default CandidatePicture
