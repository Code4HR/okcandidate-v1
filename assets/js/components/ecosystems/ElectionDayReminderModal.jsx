import React, { PropTypes, Component } from 'react'

import {
  Modal,
  Button
} from 'react-bootstrap'

import {
  submitElectionDayReminder,
  hideElectionDayReminderModal
} from './../../redux/survey/survey-actions'

import ElectionDayReminderForm from './../organisms/ElectionDayReminderForm.jsx'

class ElectionDayReminderModal extends Component {

  submitElectionDayReminder() {
    // There is a bug where reloading the page clears the stored surveyResponseId,
    // in which case we can retrieve the surveyResponseId from window.location.
    const surveyId = this.props.surveyId || window.location.pathname.split('/').slice(-1)[0]
    this.props.dispatch(submitElectionDayReminder(
      this.props.electionDayReminder.email,
      this.props.electionDayReminder.telephone,
      surveyId
    ))

  }

  closeModal() {
    this.props.dispatch(hideElectionDayReminderModal())
  }

  render() {
    return (
      <Modal
        show={this.props.electionDayReminder.displayModal}
        onDismiss={this.closeModal.bind(this)}>
        <Modal.Header>
          <Modal.Title>Set Up Election Day Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>We can remind you of your OKCandidate Results before you head to
             the polls on election day!</p>
          <ElectionDayReminderForm
            telephone={this.props.electionDayReminder.telephone}
            email={this.props.electionDayReminder.email}
            alert={this.props.electionDayReminder.alert}
            onSubmit={this.submitElectionDayReminder.bind(this)}
            dispatch={this.props.dispatch} />
        </Modal.Body>
        <Modal.Footer>
          <a style={{float: 'left'}}
            href="https://github.com/Code4HR/okcandidate/wiki/Privacy-Policy"
            target="_blank">Privacy Policy</a>{' '}
          <Button
            bsStyle="primary"
            onClick={this.submitElectionDayReminder.bind(this)}>
            Submit
          </Button>
          <Button
            bsStyle="default"
            onClick={this.closeModal.bind(this)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

}

ElectionDayReminderModal.propTypes = {
  electionDayReminder: PropTypes.object,
  surveyId: PropTypes.number,
  dispatch: PropTypes.func
}

export default ElectionDayReminderModal
