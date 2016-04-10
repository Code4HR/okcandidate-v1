import React from 'react/addons'
import { expect } from 'chai'
import Rating from 'react-rating'
import SurveyQuestion from '../../../../assets/js/components/organisms/SurveyQuestion'

const TestUtils = React.addons.TestUtils;

describe('The survey question component', () => {
  let surveyQuestion;

  beforeEach(() => {
    const question = {
      questionText: 'test',
      answers: [
        {id: 1, answerLabel: '1'},
        {id: 2, answerLabel: '2'},
        {id: 3, answerLabel: '3'}
      ],
      alerts: {
        answer: 'Potato train',
        intensity: 'Select a brain'
      }
    }
    surveyQuestion = TestUtils.renderIntoDocument(
      <SurveyQuestion question={ question } />
    )
  })

  context('Rating Element', () => {
    let rating

    beforeEach(() => {
      rating = TestUtils.scryRenderedComponentsWithType(
        surveyQuestion, Rating)[0]
    })

    it('will exist', () => {
      expect(rating).to.exist
    })

    context('property', () => {
      let props

      beforeEach(() => {
        props = rating.props
      })

      context('empty', () => {
        let empty

        beforeEach(() => {
          empty = props.empty
        })

        it('will have a heart icon', () => {
          expect(empty).to.contain('heart-empty')
        })
      })

      context('full', () => {
        let full

        beforeEach(() => {
          full = props.full
        })

        it('will have a heart icon', () => {
          expect(full).to.contain('heart')
        })
      })
    })
  })
})
