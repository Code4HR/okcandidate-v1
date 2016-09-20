import React from 'react'
import ReactDOM from 'react-dom'
import { expect } from 'chai'
import { browserHistory } from 'react-router'
import questions from './../fixtures/questions'
import categories from './../fixtures/categories'
import TestUtils from 'react-addons-test-utils'
import sinon from 'sinon'

import SurveyQuestionPager
  from './../../../../assets/js/components/ecosystems/SurveyQuestionPager.jsx'
import {
  removeSurveyQuestionResponseAndIntensity
} from './../../../../assets/js/redux/survey/survey-actions.js'

describe('Survey Question Pager', () => {

  let component, stub, dispatch

  beforeEach(() => {
    dispatch = sinon.stub()
    stub = sinon.stub(browserHistory, 'push', (() => true))
    component = TestUtils.renderIntoDocument(
      <SurveyQuestionPager
        categories={categories}
        questions={questions}
        dispatch={dispatch} />
    )
  })

  it('will exist', () => {
    expect(component).to.be.ok
  })

  it('will have an initial alerts object in its state', () => {
    expect(component).to.have.property('state')
      .that.have.property('alerts')
      .that.is.an('object')
  })

  context('Survey Question Pager', () => {

    context('Back Button', () => {

      it('should show the previous question in the survey if clicked and the ' +
         'use has answered at least one question', () => {

        const backButton = ReactDOM.findDOMNode(component.refs.backButton)

        component.state.index = 1
        TestUtils.Simulate.click(backButton)
        expect(component.state.index).to.equal(0)

      })

      it('should go back to the first page if clicked on the first index', () => {

        const backButton = ReactDOM.findDOMNode(component.refs.backButton)

        component.state.index = 0
        TestUtils.Simulate.click(backButton)
        expect(component.state.index).to.equal(0)
        expect(stub).to.have.been.called

      })

    })

    context('Skip Button', () => {

      it('should allow the use to skip to the next question', () => {

        const skipButton = ReactDOM.findDOMNode(component.refs.skipButton)

        component.state.index = 0
        TestUtils.Simulate.click(skipButton)
        expect(component.state.index).to.equal(1)

      })

      it('should dispatch an action to remove this response', () => {

        const skipButton = ReactDOM.findDOMNode(component.refs.skipButton)

        component.state.index = 0
        TestUtils.Simulate.click(skipButton)
        expect(component.state.index).to.equal(1)
        sinon.assert.calledWith(dispatch, removeSurveyQuestionResponseAndIntensity(1))

      })

    })

    context('Next Button', () => {

      it('should allow the user to skip to the next question if they have ' +
         'not interacted with other parts of the form', () => {

        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)

        component.state.index = 0
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(1)

      })

      it('should go to the next question if clicked and the user has answered ' +
         'the question and selected how strong they feel', () => {

        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)

        component.state.index = 1
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(2)

      })

      it('should provide messaging if clicked and if intensity was not selected', () => {

        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)

        component.state.index = 2
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(2)
        expect(Object.keys(component.state.alerts).length).to.equal(1)

      })

      it('should provide messaging if clicked and if an answer was not selected', () => {

        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)

        component.state.index = 3
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(3)
        expect(Object.keys(component.state.alerts).length).to.equal(1)

      })

      it('should navigate to the next page if the user is on the last question ' +
         ' and validation passes.', () => {
        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)
        component.state.index = 3
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(3)
        expect(stub).to.have.been.called
      })

    })

  })

  afterEach(() => {
    stub.restore()
  })
})
