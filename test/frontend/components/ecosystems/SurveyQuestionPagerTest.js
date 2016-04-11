import React from 'react'
import { expect } from 'chai'
import { browserHistory } from 'react-router'
import questions from './../fixtures/questions'
import TestUtils from 'react-addons-test-utils'
import sinon from 'sinon'

import SurveyQuestionPager
  from '../../../../assets/js/components/ecosystems/SurveyQuestionPager.jsx'

describe('Survey Question Pager', () => {

  let component, stub

  context('Survey Question Pager', () => {

    beforeEach(() => {

      stub = sinon.stub(browserHistory, 'push', (() => true))

      component = TestUtils.renderIntoDocument(
        <SurveyQuestionPager questions={questions} />
      )
    })

    afterEach(() => {

      stub.restore()

    })

    context('Back Button', () => {

      it('should show the previous question in the survey if clicked and the ' +
         'use has answered at least one question', () => {

        const backButton = component.refs.backButton.getDOMNode()

        component.state.index = 1
        TestUtils.Simulate.click(backButton)
        expect(component.state.index).to.equal(0)

      })

      it('should go back to the first page if clicked on the first index', () => {

        const backButton = component.refs.backButton.getDOMNode()

        component.state.index = 0
        TestUtils.Simulate.click(backButton)
        expect(component.state.index).to.equal(0)
        expect(stub).to.have.been.called

      })

    })

    context('Next Button', () => {

      it('should allow the user to skip to the next question if they have ' +
         'not interacted with other parts of the form', () => {

        const nextButton = component.refs.nextButton.getDOMNode()
        component.state.index = 0
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(1)

      })

      it('should go to the next question if clicked and the user has answered ' +
         'the question and selected how strong they feel', () => {

        const nextButton = component.refs.nextButton.getDOMNode()
        component.state.index = 1
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(2)

      })

      it('should provide messaging if clicked and if intensity was not selected', () => {

        const nextButton = component.refs.nextButton.getDOMNode()
        component.state.index = 2
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(2)
        expect(Object.keys(component.state.alerts).length).to.equal(1)

      })

      it('should provide messaging if clicked and if an answer was not selected', () => {

        const nextButton = component.refs.nextButton.getDOMNode()
        component.state.index = 3
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(3)
        expect(Object.keys(component.state.alerts).length).to.equal(1)

      })

      it('should navigate to the next page if the user is on the last question ' +
         ' and validation passes.', () => {
        const nextButton = component.refs.nextButton.getDOMNode()
        component.state.index = 3
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(3)
        expect(stub).to.have.been.called
      })

    })

  })

})
