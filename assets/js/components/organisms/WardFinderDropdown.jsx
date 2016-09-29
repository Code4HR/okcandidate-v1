import React, { Component, PropTypes } from 'react'

import {
  FormGroup,
  ControlLabel,
  FormControl
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

  selectGeography(event) {
    const selection = parseInt(event.target.value, 10)
    this.props.dispatch(selectGeography(selection))
  }

  render() {
    return (
      <div style={style.container}>
        <FormGroup
          bsSize="large"
          controlId="selectGeography">
          <ControlLabel>Select a Super Ward</ControlLabel>
          <FormControl
            onChange={this.selectGeography.bind(this)}
            label="Select a Super Ward"
            value={this.props.ward.id}
            componentClass="select"
            placeholder="select">
            {
              [
                {id: null, geographyName: 'Select...'},
                ...this.props.ward.results
              ].map(ward => {
                return (
                  <option value={ward.id}>{ward.geographyName}</option>
                )
              })
            }
          </FormControl>
        </FormGroup>
      </div>
    )
  }

}

WardFinderDropdown.propTypes = {
  ward: PropTypes.object,
  dispatch: PropTypes.func
}

export default WardFinderDropdown
