import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Col } from 'react-bootstrap'
import { expect } from 'chai'
import sinon from 'sinon'

import ResultsPage
  from '../../../../assets/js/components/ecosystems/ResultsPage'
import LoadingIndicator
  from '../../../../assets/js/components/atoms/LoadingIndicator'
import ElectionDayReminderPrompt
  from '../../../../assets/js/components/organisms/ElectionDayReminderPrompt'

describe('The results page', () => {

  let page, state, dispatch, store

  beforeEach(() => {
    state = sinon.stub()
    dispatch = sinon.stub()
    store = {
      getState: state,
      subscribe: sinon.stub(),
      dispatch: dispatch
    }
    state.returns({
      survey: {
        selectedSurvey: {
          index: 0
        },
        electionDayReminder: {
          displayPrompt: true
        },
        candidateMatch: {
          survey: []
        },
        responses: [],
        questions: []
      }
    })
    page = TestUtils.renderIntoDocument(
      <ResultsPage store={store} params={{ id: '' }} />
    )
  })

  it('will exist', () => {
    expect(page).to.be.ok
  })

  context('Election Day Reminder Prompt', () => {

    let prompt

    beforeEach(() => {
      prompt = TestUtils.scryRenderedComponentsWithType(page, ElectionDayReminderPrompt)
    })

    it('will exist' ,() => {
      expect(prompt).to.be.ok
    })

    context('If user has dismissed the alert', () => {
      let page
      beforeEach(() => {
        state.returns({
          survey: {
            electionDayReminder: {
              displayPrompt: false
            },
            isFetching: true,
            candidateMatch: {
              survey: []
            },
            questions: [],
            responses: []
          }
        })
        page = TestUtils.renderIntoDocument(
          <ResultsPage store={store} params={{ id: '' }} />
        )
      })

      it('should not exist', () => {
        prompt = TestUtils.scryRenderedComponentsWithType(page, ElectionDayReminderPrompt)
        expect(prompt).to.have.length(0)
      })

    })

  })

  context('column', () => {
    let column

    beforeEach(() => {
      column = TestUtils.scryRenderedComponentsWithType(page, Col)[0]
    })

    it('will exist', () => {
      expect(column).to.be.ok
    })

    context('when it has no matches', () => {
      it('will not have any loading indicators', () => {
        let indicators =
          TestUtils.scryRenderedComponentsWithType(page, LoadingIndicator)
        expect(indicators).to.not.be.empty
      })
    })

    context('when fetching', () => {
      beforeEach(() => {
        state.returns({
          survey: {
            electionDayReminder: {
              displayPrompt: true
            },
            isFetching: true,
            candidateMatch: {
              survey: []
            },
            questions: [],
            responses: []
          }
        })
        page = TestUtils.renderIntoDocument(
          <ResultsPage store={store} params={{ id: '' }} />
        )
      })

      it('will have a loading indicator', () => {
        let indicators =
          TestUtils.scryRenderedComponentsWithType(page, LoadingIndicator)
        expect(indicators).to.not.be.empty
      })
    })

    context('when it has matches', () => {
      beforeEach(() => {
        state.returns({
          survey: {
            electionDayReminder: {
              displayPrompt: true
            },
            candidateMatch: {
              survey: [{
                type: 'match'
              }]
            },
            questions: [],
            responses: []
          }
        })
        page = TestUtils.renderIntoDocument(
          <ResultsPage store={store} params={{ id: '' }} />
        )
      })

      it('will not have a loading indicator', () => {
        let indicators =
          TestUtils.scryRenderedComponentsWithType(page, LoadingIndicator)
        expect(indicators).to.be.empty
      })
    })
  })
})
