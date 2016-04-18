import React, { Component, PropTypes } from 'react'

import colors from './../style/colors'

const style = {
  container: {
    borderRadius: '100%',
    width: 72,
    height: 72,
    background: colors.lightBlue,
    backgroundSize: 'contain'
  }
}



class CandidatePicture extends Component {

  /*
   * @name
   * #getCandidatePicture
   * @description
   * Checks the contents of the users name. If a match is found, return the
   * correct photo.  This will be removed when the candidate image path comes
   * from the backend.
   */
  getImagePath(name) {

    let imgPath

    switch (name) {
        case 'Kenneth Cooper Alexander':
          imgPath = '/img/candidates/alexander.jpg'
          break

        case 'Robert J. McCabe':
          imgPath = '/img/candidates/mccabe.jpg'
          break

        case 'Andy A. Protogyrou':
          imgPath = '/img/candidates/protogyrou.jpg'
          break

        case 'Andria P. McClellan':
          imgPath = '/img/candidates/mcclellan.jpg'
          break

        case 'Warren A. Stewart':
          imgPath = '/img/candidates/stewart.jpg'
          break

        case 'Barclay C. Winn':
          imgPath = '/img/candidates/winn.jpg'
          break

        case 'Harry David Candela':
          imgPath = '/img/candidates/candela.jpg'
          break

        case 'G.W. \'Billy\' Cook, Jr.':
          imgPath = '/img/candidates/cook.jpg'
          break

        case 'Angelia Williams Graves':
          imgPath = '/img/candidates/graves.jpg'
          break

        case 'Kendrick J. Turner':
          imgPath = '/img/candidates/turner.jpg'
          break

        default:

    }

    return {
      background: `url(${imgPath})`
    }

  }

  getStyle() {
    return Object.assign({}, style.container, this.getImagePath(this.props.candidateName))
  }

  render() {
    return (
      <section style={this.getStyle.call(this)}></section>
    )
  }

}

CandidatePicture.propTypes = {
  candidateName: PropTypes.string
}

export default CandidatePicture
