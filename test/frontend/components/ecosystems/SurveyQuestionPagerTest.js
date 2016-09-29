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
  incrementSurveyQuestionIndex,
  decrementSurveyQuestionIndex,
  removeSurveyQuestionResponseAndIntensity
} from './../../../../assets/js/redux/survey/survey-actions.js'

describe('Survey Question Pager', () => {

  let component, stub, dispatch

  context('Sanity Check', () => {
    beforeEach(() => {
      dispatch = sinon.spy()
      stub = sinon.stub(browserHistory, 'push', (() => true))
      component = TestUtils.renderIntoDocument(
        <SurveyQuestionPager
          categories={categories}
          questions={questions}
          index={1}
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
  })

  context('Survey Question Pager', () => {

    context('Back Button', () => {

      let component

      before(() => {
        component = TestUtils.renderIntoDocument(
          <SurveyQuestionPager
            categories={categories}
            questions={questions}
            index={1}
            dispatch={dispatch} />
        )
      })

      it('should show the previous question in the survey if clicked and the ' +
         'use has answered at least one question', () => {

        const backButton = ReactDOM.findDOMNode(component.refs.backButton)

        TestUtils.Simulate.click(backButton)
        expect(dispatch).to.be.called
        sinon.assert.calledWith(dispatch, decrementSurveyQuestionIndex())

      })

      it('should go back to the first page if clicked on the first index', () => {

        const backButton = ReactDOM.findDOMNode(component.refs.backButton)

        TestUtils.Simulate.click(backButton)
        expect(stub).to.have.been.called

      })

    })

    context('Skip Button', () => {

      it('should allow the use to skip to the next question', () => {

        const skipButton = ReactDOM.findDOMNode(component.refs.skipButton)

        TestUtils.Simulate.click(skipButton)
        expect(dispatch).to.have.been.called

      })

      it('should dispatch an action to remove this response', () => {

        const skipButton = ReactDOM.findDOMNode(component.refs.skipButton)

        TestUtils.Simulate.click(skipButton)
        sinon.assert.calledWith(dispatch, incrementSurveyQuestionIndex())

      })

    })

    context('Next Button', () => {

      it('should allow the user to skip to the next question if they have ' +
         'not interacted with other parts of the form', () => {

        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)

        TestUtils.Simulate.click(nextButton)
        sinon.assert.calledWith(dispatch, incrementSurveyQuestionIndex())

      })

      it('should go to the next question if clicked and the user has answered ' +
         'the question and selected how strong they feel', () => {

        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)

        TestUtils.Simulate.click(nextButton)
        sinon.assert.calledWith(dispatch, incrementSurveyQuestionIndex())

      })

      it('should provide messaging if clicked and if intensity was not selected', () => {

        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)

        questions[1] = Object.assign(questions[1], {
          selectedAnswer: 'Potato Brain'
        })

        TestUtils.Simulate.click(nextButton)
        expect(Object.keys(component.state.alerts).length).to.equal(1)

      })

      it('should provide messaging if clicked and if an answer was not selected', () => {

        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)

        questions[3] = Object.assign(questions[3], {
          intensity: 5
        })

        component.state.index = 3
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(3)
        expect(Object.keys(component.state.alerts).length).to.equal(1)

      })

      it('should navigate to the next page if the user is on the last question ' +
         ' and validation passes.', () => {

        questions[35] = Object.assign(questions[3], {
          intensity: 5,
          selectedAnswer: 'My Neighbor Totoro'
        })

        const nextButton = ReactDOM.findDOMNode(component.refs.nextButton)
        component.state.index = 35
        TestUtils.Simulate.click(nextButton)
        expect(component.state.index).to.equal(35)
        expect(stub).to.have.been.called
      })

    })

  })

  afterEach(() => {
    stub.restore()
  })
})
