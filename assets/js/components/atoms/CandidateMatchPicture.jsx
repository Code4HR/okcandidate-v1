import React, { Component, PropTypes } from 'react'

import colors from './../style/colors'

const style = {
  container: {
    borderRadius: '100%',
    width: 72,
    height: 72,
    background: colors.lightBlue,
    backgroundSize: 'cover'
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

    const rootPath = '/img/candidates/virginiabeach'

    const picture = {
      'Jessica Abbott': 'abbott.jpg',
      'Dane U. Blythe': 'blythe.jpg',
      'Bobby Dyer': 'dyer.jpg',
      'George Furman III': 'furman.jpg',
      'Amelia Ross-Hammond': 'hammond.jpg',
      'Richard W. "RK" Kowalewitch': 'kowalewitch.jpg',
      'Courtney LaLonde': 'lalonde.jpg',
      'William D. Sessoms, Jr.': 'sessoms.jpg',
      'A.M. "Don" Weeks': 'weeks.jpg',
      'Rosemary Wilson': 'wilson.jpg',
      'Pam Witham': 'witham.jpg',
      'Robert K. Dean': 'dean.jpg',
      'Shannon Kane': 'kane.jpg'
    }[name]

    return {
      background: `url(${rootPath}/${picture})`
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
