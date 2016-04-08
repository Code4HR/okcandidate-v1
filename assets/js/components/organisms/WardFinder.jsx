import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router'

import {
  Input,
  Button,
  Col,
  Grid,
  Row
} from 'react-bootstrap'

import {
  setStreetAddress,
  submitStreetAddress,
  fetchGeography,
  selectGeography
} from './../../redux/survey/survey-actions'

class WardFinder extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchGeography())
  }

  onSetAddress(event) {
    this.props.dispatch(setStreetAddress({ value: event.target.value }))
  }

  selectGeography() {
    const selection = parseInt(this.refs.selectGeography.getValue(), 10)
    this.props.dispatch(selectGeography(selection))
  }

  submitAddress() {
    this.props.dispatch(submitStreetAddress(this.props.ward.address.value))
  }

  nextPage() {
    browserHistory.push('/survey/questions')
  }

  render() {

    return (
      <section>

        <Input type="text"
          label="Street Address"
          onChange={this.onSetAddress.bind(this)}
          value={this.props.ward.address.value}
          help={this.props.ward.address.help}
          bsSize="large"
          bsStyle={this.props.ward.address.help ? 'warning' : null}
          placeholder="111 Granby St"
          buttonAfter={
            <Button
              onClick={this.submitAddress.bind(this)}
              bsStyle="primary">Submit</Button>
          } />

          {/*

          <Col xs={12} sm={6}>
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
          </Col>

        </Row>

        */}

      </section>
    )
  }

}

WardFinder.propTypes = {
  ward: PropTypes.object,
  dispatch: PropTypes.func
}

export default WardFinder
