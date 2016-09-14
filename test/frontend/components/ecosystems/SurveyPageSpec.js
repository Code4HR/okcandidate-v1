import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { browserHistory } from 'react-router'
import { expect } from 'chai'
import sinon from 'sinon'

import SurveyPage from '../../../../assets/js/components/ecosystems/SurveyPage'
import LoadingIndicator
  from '../../../../assets/js/components/atoms/LoadingIndicator'

describe('The survey page component', () => {
  let page, state, store, dispatch, push

  beforeEach(() => {
    push = sinon.stub(browserHistory, 'push')
    state = sinon.stub()
    dispatch = sinon.stub()
    store = {
      getState: state,
      subscribe: sinon.stub(),
      dispatch: dispatch
    }
    state.returns({
      survey: {
        categories: [
          {
            categoryName: 'Transportation',
            firstQuestionIndex: 0,
            id: 1,
            surveyId: 1
          },
          {
            categoryName: 'Economics',
            firstQuestionIndex: 3,
            id: 2,
            surveyId: 1
          },
          {
            categoryName: 'Governance',
            firstQuestionIndex: 6,
            id: 3,
            surveyId: 1
          }
        ],
        questions: [
          {
            'id': 1,
            'surveyId': 1,
            'categoryId': 1,
            'questionText': 'Do you support the city\’s Complete Streets initiative?',
            'answers': [
              {
                'id': 1,
                'questionId': 1,
                'answerLabel': 'Yes, streets should accommodate bikes and pedestrians in addition to cars.',
                'answerValue': 'Yes, streets should accommodate bikes and pedestrians in addition to cars.'
              },
              {
                'id': 2,
                'questionId': 1,
                'answerLabel': 'To a degree.',
                'answerValue': 'To a degree.'
              },
              {
                'id': 3,
                'questionId': 1,
                'answerLabel': 'No. Our city was designed for vehicular traffic and should stay that way.',
                'answerValue': 'No. Our city was designed for vehicular traffic and should stay that way.'
              }
            ]
          },
          {
            'id': 2,
            'surveyId': 1,
            'categoryId': 1,
            'questionText': 'Was The Tide a good use of city money?',
            'answers': [
              {
                'id': 4,
                'questionId': 2,
                'answerLabel': 'Absolutely. The Tide showed visionary leadership.',
                'answerValue': 'Absolutely. The Tide showed visionary leadership.'
              },
              {
                'id': 5,
                'questionId': 2,
                'answerLabel': 'It remains to be seen.',
                'answerValue': 'It remains to be seen.'
              },
              {
                'id': 6,
                'questionId': 2,
                'answerLabel': 'No. This was inefficient transportation spending.',
                'answerValue': 'No. This was inefficient transportation spending.'
              }
            ]
          },
          {
            'id': 3,
            'surveyId': 1,
            'categoryId': 1,
            'questionText': 'Where should The Tide go next?',
            'answers': [
              {
                'id': 7,
                'questionId': 3,
                'answerLabel': 'ODU',
                'answerValue': 'ODU'
              },
              {
                'id': 8,
                'questionId': 3,
                'answerLabel': 'Norfolk International Airport',
                'answerValue': 'Norfolk International Airport'
              },
              {
                'id': 9,
                'questionId': 3,
                'answerLabel': 'Naval Station Norfolk',
                'answerValue': 'Naval Station Norfolk'
              },
              {
                'id': 10,
                'questionId': 3,
                'answerLabel': 'Nowhere',
                'answerValue': 'Nowhere'
              }
            ]
          }
        ],
        responses: [],
        isFetching: false
      }
    })
    page = TestUtils.renderIntoDocument(
      <SurveyPage store={store} />
    ).getWrappedInstance()
  })

  it('will exist', () => {
    expect(page).to.be.ok
  })

  context('under normal circumstances', () => {
    it('will not have any indicators', () => {
      let indicators =
        TestUtils.scryRenderedComponentsWithType(page, LoadingIndicator)
      expect(indicators).to.be.empty
    })
  })

  context('when fetching records', () => {
    context('with no questions', () => {
      beforeEach(() => {
        state.returns({
          survey: {
            questions: [],
            responses: [],
            isFetching: true
          }
        })

        page = TestUtils.renderIntoDocument(
          <SurveyPage store={store} />
        ).getWrappedInstance()
      })

      it('will have an indicator', () => {
        let indicators =
          TestUtils.scryRenderedComponentsWithType(page, LoadingIndicator)
        expect(indicators).to.not.be.empty
      })
    })
  })

  afterEach(() => {
    push.restore()
  })
})
