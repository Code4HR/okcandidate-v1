import React, { Component, PropTypes } from 'react'

import {
  FormGroup,
  FormControl,
  InputGroup,
  HelpBlock,
  Button
} from 'react-bootstrap'

import {
  setStreetAddress,
  submitStreetAddress,
  fetchGeography
} from './../../redux/survey/survey-actions'

const style = {
  container: {
    textAlign: 'left'
  }
}

class WardFinderAddress extends Component {

  constructor(props) {
    super(props)
    this.props.dispatch(fetchGeography())
  }

  onSetAddress(event) {
    this.props.dispatch(setStreetAddress({ value: event.target.value }))
  }

  submitAddress() {
    this.props.dispatch(submitStreetAddress(this.props.ward.address.value))
  }

  onEnter(e) {
    const code = (e.keyCode ? e.keyCode : e.which)
    if (code === 13) {
      this.submitAddress()
    }
  }

  render() {

    return (
      <div style={style.container}>
        <FormGroup
          controlId="streetAddress"
          bsSize="large"
          validationState={this.props.ward.address.help ? 'warning' : null}>
          <InputGroup>
            <FormControl
              label="Street Address"
              onChange={this.onSetAddress.bind(this)}
              value={this.props.ward.address.value}
              placeholder="1701 Baltic Ave"
              onKeyDown={this.onEnter.bind(this)}/>
            <InputGroup.Button>
              <Button
                onClick={this.submitAddress.bind(this)}
                bsSize="large"
                bsStyle="primary">Submit</Button>
            </InputGroup.Button>
          </InputGroup>
          <HelpBlock>{this.props.ward.address.help}</HelpBlock>
        </FormGroup>
      </div>
    )
  }

}

WardFinderAddress.propTypes = {
  ward: PropTypes.object,
  dispatch: PropTypes.func
}

export default WardFinderAddress
