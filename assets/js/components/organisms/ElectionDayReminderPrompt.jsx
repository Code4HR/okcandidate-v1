import React, { PropTypes, Component } from 'react'

import {
  Alert,
  Button
} from 'react-bootstrap'

import {
  hideElectionDayReminderPrompt,
  showElectionDayReminderModal
} from './../../redux/survey/survey-actions'

class ElectionDayReminderPrompt extends Component {

  hideElectionDayReminderPrompt() {
    this.props.dispatch(hideElectionDayReminderPrompt())
  }

  showElectionDayReminderForm() {
    this.props.dispatch(showElectionDayReminderModal())
  }

  render() {
    return (
      this.props.electionDayReminder.submitted ?
        <Alert bsStyle="success">
          <h4>Election Day Reminder Submitted</h4>
          <p>We'll contact you on election day with these results.</p>
        </Alert>
      :
        <Alert bsStyle="info">
          <h4>Election Day Reminder</h4>
          <p>Would you like us to email or text you these results on election day?</p>
          <div style={{marginTop: '.5em'}}>
            <Button
              onClick={this.showElectionDayReminderForm.bind(this)}
              bsStyle="info">Sure!</Button>{' '}
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
