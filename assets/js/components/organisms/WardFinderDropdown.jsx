import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router'

import {
  Input
} from 'react-bootstrap'

import {
  selectGeography
} from './../../redux/survey/survey-actions'

const style = {
  container: {
    textAlign: 'left'
  }
}

class WardFinderDropdown extends Component {

  constructor(props) {
    super(props)
  }

  selectGeography() {
    const selection = parseInt(this.refs.selectGeography.getValue(), 10)
    this.props.dispatch(selectGeography(selection))
  }

  nextPage() {
    browserHistory.push('/survey/questions')
  }

  render() {
    return (
      <div style={style.container}>
        <Input
          ref="selectGeography"
          onChange={this.selectGeography.bind(this)}
          bsSize="large"
          type="select"
          label="Select a Super Ward"
          value={this.props.ward.id}
          placeholder="select">
          <option value={0}>...</option>
          {
            this.props.ward.results.map(ward => {
              return (
                <option value={ward.id}>{ward.geographyName}</option>
              )
            })
          }
        </Input>
      </div>
    )
  }

}

WardFinderDropdown.propTypes = {
  ward: PropTypes.object,
  dispatch: PropTypes.func
}

export default WardFinderDropdown
