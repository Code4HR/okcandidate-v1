import React, { PropTypes, Component } from 'react'

import colors from './../style/colors'

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Glyphicon,
  InputGroup,
  Alert
} from 'react-bootstrap'

const orLine = {
  container: {
    border: `1px solid ${colors.lightBlue}`,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    textAlign: 'center',
    marginBottom: '.5em',
    padding: '0.25em'
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: 500
  }
}

import {
  setElectionDayReminderEmailAddress,
  setElectionDayReminderTelephoneNumber
} from './../../redux/survey/survey-actions'

class ElectionDayReminderForm extends Component {

  setTelephoneNumber(event) {
    const value = event.target.value
    this.props.dispatch(setElectionDayReminderTelephoneNumber(value))
  }

  setEmailAddress(event) {
    const value = event.target.value
    this.props.dispatch(setElectionDayReminderEmailAddress(value))
  }

  onEnter(event) {
    const code = (event.keyCode ? event.keyCode : event.which)
    if (code === 13) {
      this.props.onSubmit()
    }
  }

  render() {
    return (
      <form onKeyDown={this.onEnter.bind(this)}>

        { this.props.alert.message &&
          <Alert bsStyle={this.props.alert.severity}>
            {this.props.alert.message}
          </Alert>
        }

        <FormGroup
          bsSize="large"
          controlId="telephone"
          validationState={this.props.telephone.error ? 'error' : null}>
          <ControlLabel>Telephone</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="phone" />
            </InputGroup.Addon>
            <FormControl
              type="text"
              value={this.props.telephone.value}
              placeholder="Your cell number here"
              onChange={this.setTelephoneNumber.bind(this)} />
          </InputGroup>
          <HelpBlock>{this.props.telephone.error}</HelpBlock>
        </FormGroup>

        <div style={orLine.container}>
          <span style={orLine.label}>Or</span>
        </div>

        <FormGroup
          bsSize="large"
          controlId="email"
          validationState={this.props.email.error ? 'error' : null}>
          <ControlLabel>Email</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>
              <Glyphicon glyph="envelope" />
            </InputGroup.Addon>
            <FormControl
              type="email"
              value={this.props.email.value}
              placeholder="Your email address here"
              onChange={this.setEmailAddress.bind(this)} />
          </InputGroup>
          <HelpBlock>{this.props.email.error}</HelpBlock>
        </FormGroup>

      </form>
    )
  }

}

ElectionDayReminderForm.propTypes = {
  telephone: PropTypes.object,
  email: PropTypes.object,
  alert: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}

export default ElectionDayReminderForm
