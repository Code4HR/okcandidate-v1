import jsdom from 'mocha-jsdom'
import React from 'react/addons'
import { expect } from 'chai'
import Rating from 'react-rating'
import SurveyQuestion from '../../../../assets/js/components/organisms/SurveyQuestion'

var TestUtils = React.addons.TestUtils;

describe('The survey question component', () => {
    let surveyQuestion;

    beforeEach(() => {
        let question = {
            questionText: 'test',
            answers: [
                {id: 1, answerLabel: '1'},
                {id: 2, answerLabel: '2'},
                {id: 3, answerLabel: '3'}
            ]
        }
        surveyQuestion = TestUtils.renderIntoDocument(
            <SurveyQuestion question={ question } />
        )
    })

    context('rating element', () => {
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
