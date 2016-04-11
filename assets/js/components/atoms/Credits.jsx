import React, { Component } from 'react'

import colors from './../style/colors'

const style = {
  container: {
    textAlign: 'center',
    color: colors.black
  },
  heart: {
    color: colors.red,
    fontSize: '2rem',
    position: 'relative',
    top: '2px'
  }
}

class Credits extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={style.container}>
        <p>
           Made with <span style={style.heart}>&hearts;</span> by <a href="http://code4hr.org/">Code for Hampton
           Roads Volunteers</a> and the <a href="http://pilotonline.com/">Virginian Pilot</a>.
        </p>
      </div>
    )
  }

}

Credits.PropTypes = {

}

export default Credits
