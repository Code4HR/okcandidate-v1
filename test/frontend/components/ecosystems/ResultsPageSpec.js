import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Col } from 'react-bootstrap'
import { expect } from 'chai'
import sinon from 'sinon'

import ResultsPage
  from '../../../../assets/js/components/ecosystems/ResultsPage'
import LoadingIndicator
  from '../../../../assets/js/components/atoms/LoadingIndicator'

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
        candidateMatch: {
          survey: [
          ]
        }
      }
    })
    page = TestUtils.renderIntoDocument(
      <ResultsPage store={store} params={{ id: '' }} />
    )
  })

  it('will exist', () => {
    expect(page).to.be.ok
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
            isFetching: true,
            candidateMatch: {
              survey: [
              ]
            }
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
            candidateMatch: {
              survey: [{
                type: 'match'
              }]
            }
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
