import { expect } from 'chai'

import {
  validateElectionDayReminderRequest
} from './../../../../assets/js/redux/survey/survey-actions'

describe('Survey Actions', () => {

  describe('Election Day Reminders', () => {

    context('#validateElectionDayReminderRequest', () => {

      it('should return undefined if no errors were found', () => {
        const result = validateElectionDayReminderRequest('code4hr@gmail.com')
        expect(result).to.be.undefined
      })

      it('should return an error object for bad email addresses', () => {
        const result = validateElectionDayReminderRequest('1wpbiasdf')
        expect(result).to.be.an.object
        expect(result.alert)
          .to.deep.equal({
            message: 'Please correct the error below',
            severity: 'warning'
          })
        expect(result.email)
          .to.deep.equal({
            value: '1wpbiasdf',
            error: 'Please enter a valid email address (like person@provider.com).'
          })
      })

      it('should return an error object for bad telephone numbers', () => {
        const result = validateElectionDayReminderRequest(undefined, '34343')
        expect(result).to.be.an.object
        expect(result.alert)
          .to.deep.equal({
            message: 'Please correct the error below',
            severity: 'warning'
          })
        expect(result.telephone)
          .to.deep.equal({
            value: '34343',
            error: 'Please enter a 10-digit phone number (like 555-555-5555).'
          })
      })

      it('should return an error object for bad telephone numbers and email ' +
         'addresses', () => {
        const result = validateElectionDayReminderRequest('1wpbiasdf', '34343')
        expect(result).to.be.an.object
        expect(result.alert)
          .to.deep.equal({
            message: 'Please correct the errors below',
            severity: 'warning'
          })
        expect(result.telephone)
          .to.deep.equal({
            value: '34343',
            error: 'Please enter a 10-digit phone number (like 555-555-5555).'
          })
        expect(result.email)
          .to.deep.equal({
            value: '1wpbiasdf',
            error: 'Please enter a valid email address (like person@provider.com).'
          })
      })

      it('should return an error object if neither an email address or ' +
         'telephone number was provided', () => {

        const result = validateElectionDayReminderRequest()
        expect(result).to.be.an.object
        expect(result.alert)
         .to.deep.equal({
           message: 'At least one piece of contact information should be provided',
           severity: 'warning'
         })

      })

    })

  })

})
