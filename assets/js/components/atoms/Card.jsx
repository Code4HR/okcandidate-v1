import React, { Component, PropTypes } from 'react'

import colors from './../style/colors'

const style = {
  container: {
    boxSizing: 'border-box',
    padding: '1rem',
    background: '#ffffff',
    borderRadius: '2px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12),' +
                '0 1px 2px rgba(0,0,0,0.24)'
  }
}

class Card extends Component {

  constructor(props) {
    super(props)
  }

  getStyle() {
    return Object.assign({}, style.container, this.props.style)
  }

  render() {
    return (
      <section style={this.getStyle.call(this)}>
        {this.props.children}
      </section>
    )
  }

}

Card.PropTypes = {
  children: PropTypes.any,
  style: PropTypes.object
}

export default Card
