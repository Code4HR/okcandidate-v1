import React, { PropTypes, Component } from 'react'

import {
  Alert,
  Button
} from 'react-bootstrap'

import {
  hideElectionDayReminderPrompt
} from './../../redux/survey/survey-actions'

class ElectionDayReminderPrompt extends Component {

  hideElectionDayReminderPrompt() {
    this.props.dispatch(hideElectionDayReminderPrompt())
  }

  render() {
    return (
      <Alert bsStyle="success">
        <h4>Election Day Reminder</h4>
        <p>Would you like us to email or text you these results on election day?</p>
        <div style={{textAlign: 'right', marginTop: '0.5em'}}>
          <Button bsStyle="success">Sure!</Button>{' '}
          <Button
            onClick={this.hideElectionDayReminderPrompt.bind(this)}
            bsStyle="default">No thanks</Button>
        </div>
      </Alert>
    )
  }

}

ElectionDayReminderPrompt.propTypes = {
  dispatch: PropTypes.func,
  electionDayReminder: PropTypes.object
}

export default ElectionDayReminderPrompt
