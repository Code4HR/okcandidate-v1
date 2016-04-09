import React, { Component, PropTypes } from 'react'

const style = {
  container: {
    
  }
}

class Card extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        {this.props.children}
      </section>
    )
  }

}

Card.PropTypes = {
  children: PropTypes.any
}

export default Card
