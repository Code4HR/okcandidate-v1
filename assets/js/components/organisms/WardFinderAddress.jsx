import React, { Component, PropTypes } from 'react'

import {
  Input,
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
    const code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) {
      this.submitAddress()
    }
  }

  render() {

    return (
      <div style={style.container}>
        <Input type="text"
          label="Street Address"
          onChange={this.onSetAddress.bind(this)}
          value={this.props.ward.address.value}
          help={this.props.ward.address.help}
          bsSize="large"
          bsStyle={this.props.ward.address.help ? 'warning' : null}
          placeholder="111 Granby St"
          onKeyDown={this.onEnter.bind(this)}
          buttonAfter={
            <Button
              onClick={this.submitAddress.bind(this)}
              bsStyle="primary">Submit</Button>
          } />
      </div>
    )
  }

}

WardFinderAddress.propTypes = {
  ward: PropTypes.object,
  dispatch: PropTypes.func
}

export default WardFinderAddress
