import React, { Component, PropTypes } from 'react'
import {
  connect
} from 'react-redux'
import WardFinder from './../organisms/WardFinder.jsx'

class WardFinderPage extends Component {

  render() {
    return (
      <article>
        <WardFinder
          ward={this.props.ward}
          dispatch={this.props.dispatch} />
      </article>
    )
  }

}

WardFinderPage.propTypes = {
  ward: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    ward: state.survey.ward
  })
)(WardFinderPage)
