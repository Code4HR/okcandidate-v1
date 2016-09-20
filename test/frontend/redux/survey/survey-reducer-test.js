import { expect } from 'chai'

import {
  hideElectionDayReminderPrompt,
  showElectionDayReminderModal,
  hideElectionDayReminderModal,
  setElectionDayReminderEmailAddress,
  setElectionDayReminderTelephoneNumber,
  submitElectionDayReminderSuccess,
  submitElectionDayReminderFailure
} from './../../../../assets/js/redux/survey/survey-actions'

import reducer, { initialState } from './../../../../assets/js/redux/survey/survey-reducer'

describe('Survey Reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.equal(initialState)
  })

  describe('Election Day Reminder Reducer Cases', () => {

    it('should hide the election day reminder prompt', () => {
      const state = reducer(undefined, hideElectionDayReminderPrompt())
      expect(state.electionDayReminder.displayPrompt).to.be.false
    })

    it('should show the election day reminder modal', () => {
      const state = reducer(undefined, showElectionDayReminderModal())
      expect(state.electionDayReminder.displayModal).to.be.true
    })

    it('should hide the election day reminder modal', () => {
      const state = reducer(undefined, showElectionDayReminderModal())
      const nextState = reducer(state, hideElectionDayReminderModal())
      expect(nextState.electionDayReminder.displayModal).to.be.false
    })

    it('should set the election day reminder email address', () => {
      const state = reducer(undefined, setElectionDayReminderEmailAddress('code4hr-team@gmail.com'))
      expect(state.electionDayReminder.email.value).to.equal('code4hr-team@gmail.com')
    })

    it('should set the election day reminder telephone number', () => {
      const state = reducer(undefined, setElectionDayReminderTelephoneNumber('(757) 555-5555'))
      expect(state.electionDayReminder.telephone.value).to.equal('(757) 555-5555')
    })

    it('should hide the modal, flip "submitted" to true, and clear the email and' +
       'telephone fields', () => {
      const state = reducer(undefined, submitElectionDayReminderSuccess({}))
      expect(state.electionDayReminder.displayModal).to.be.false
      expect(state.electionDayReminder.submitted).to.be.true
      expect(state.electionDayReminder.email).to.deep.equal(initialState.electionDayReminder.email)
      expect(state.electionDayReminder.telephone)
        .to.deep.equal(initialState.electionDayReminder.telephone)
    })

    it('should handle errors', () => {

      const errors = {
        alert: {
          message: 'You dun goofed',
          severity: 'danger'
        },
        email: {
          value: 'adf34',
          error: 'Please enter a valid email address'
        },
        telephone: {
          value: '3434adf',
          error: 'Please enter a telephone number'
        }
      }

      const state = reducer(undefined, submitElectionDayReminderFailure(errors))
      expect(state.electionDayReminder.alert).to.deep.equal(errors.alert)
      expect(state.electionDayReminder.email).to.deep.equal(errors.email)
      expect(state.electionDayReminder.telephone).to.deep.equal(errors.telephone)

    })

  })

})
