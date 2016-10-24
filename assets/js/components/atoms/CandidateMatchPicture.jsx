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
    const rootPath = '/img/candidates/virginiabeach'

    switch (name) {
    case 'Jessica Abbott':
      imgPath = `${rootPath}/abbott.jpg`
      break

    case 'Dane U. Blythe':
      imgPath = `${rootPath}/blythe.jpg`
      break

    case 'Bobby Dyer':
      imgPath = `${rootPath}/dyer.jpg`
      break

    case 'George Furman III':
      imgPath = `${rootPath}/furman.jpg`
      break

    case 'Amelia Ross-Hammond':
      imgPath = `${rootPath}/hammond.jpg`
      break

    case 'Richard W. "RK" Kowalewitch':
      imgPath = `${rootPath}/kowalewitch.jpg`
      break

    case 'Courtney LaLonde':
      imgPath = `${rootPath}/lalonde.jpg`
      break

    case 'William D. Sessoms, Jr.':
      imgPath = `${rootPath}/sessoms.jpg`
      break

    case 'A.M. "Don" Weeks':
      imgPath = `${rootPath}/weeks.jpg`
      break

    case 'Rosemary Wilson':
      imgPath = `${rootPath}/wilson.jpg`
      break

    case 'Pam Witham':
      imgPath = `${rootPath}/witham.jpg`
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
