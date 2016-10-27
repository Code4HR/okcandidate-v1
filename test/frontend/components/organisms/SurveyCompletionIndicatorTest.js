import React from 'react'
import { expect } from 'chai'
import TestUtils from 'react-addons-test-utils'
import sinon from 'sinon'

import SurveyCompletionIndicator
  from '../../../../assets/js/components/organisms/SurveyCompletionIndicator.jsx'
import SurveyCompletionIndicatorHeart
  from '../../../../assets/js/components/atoms/SurveyCompletionIndicatorHeart.jsx'
import {
  Button,
  ProgressBar
} from 'react-bootstrap'

describe('Survey Completion Indicator', () => {

  let component, onSubmit

  context('Spec', () => {

    beforeEach(() => {
      onSubmit = sinon.stub()
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicator
          questionsAnswered={0}
          totalQuestions={36}
          onSubmit={onSubmit} />
      )
    })

    it('should exist', () => {
      expect(component).to.be.ok
    })

    it('should have a heart icon to show completion', () => {
      const heart = TestUtils.scryRenderedComponentsWithType(
        component,
        SurveyCompletionIndicatorHeart
      )
      expect(heart).to.be.ok
    })

    it('should have a definition', () => {
      const definition =
        TestUtils.scryRenderedDOMComponentsWithTag(component, 'dd')[0]
      expect(definition.textContent).to.be.ok
    })

    it('should have a button', () => {
      const button = TestUtils.scryRenderedComponentsWithType(
        component,
        Button
      )
      expect(button).to.be.ok
    })

    it('should have a progress bar', () => {
      const progressBar = TestUtils.scryRenderedComponentsWithType(component, ProgressBar)
      expect(progressBar).to.be.ok
    })

  })

  context('Bad match - under 25%', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicator
          questionsAnswered={8}
          totalQuestions={36}
          onSubmit={onSubmit} />
      )
    })

    it('should have a match level of :(', () => {
      const definition =
        TestUtils.scryRenderedDOMComponentsWithTag(component, 'dd')[0]
      expect(definition.textContent).to.equal(':(')
    })

    it('should pass a match level of 0 to the heart', () => {
      const heart =
        TestUtils.scryRenderedComponentsWithType(component, SurveyCompletionIndicatorHeart)[0]
      expect(heart.props.level).to.equal(0)
    })

    it('should pass a progress value of 22%', () => {
      const progress =
        TestUtils.scryRenderedComponentsWithType(component, ProgressBar)[0]
      expect(progress.props.now).to.equal(22)
    })

  })

  context('OK match - 33%', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicator
          questionsAnswered={13}
          totalQuestions={36}
          onSubmit={onSubmit} />
      )
    })

    it('should have a match level of \'OK!\'', () => {
      const definition =
        TestUtils.scryRenderedDOMComponentsWithTag(component, 'dd')[0]
      expect(definition.textContent).to.equal('OK!')
    })

    it('should pass a match level of 1 to the heart', () => {
      const heart =
        TestUtils.scryRenderedComponentsWithType(component, SurveyCompletionIndicatorHeart)[0]
      expect(heart.props.level).to.equal(1)
    })

    it('should pass a progress value of 36%', () => {
      const progress =
        TestUtils.scryRenderedComponentsWithType(component, ProgressBar)[0]
      expect(progress.props.now).to.equal(36)
    })

  })

  context('Good match - 66%', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicator
          questionsAnswered={24}
          totalQuestions={36}
          onSubmit={onSubmit} />
      )
    })

    it('should have a match level of \'Good!\'', () => {
      const definition =
        TestUtils.scryRenderedDOMComponentsWithTag(component, 'dd')[0]
      expect(definition.textContent).to.equal('Good!')
    })

    it('should pass a match level of 2 to the heart', () => {
      const heart =
        TestUtils.scryRenderedComponentsWithType(component, SurveyCompletionIndicatorHeart)[0]
      expect(heart.props.level).to.equal(2)
    })

    it('should pass a progress value of 67%', () => {
      const progress =
        TestUtils.scryRenderedComponentsWithType(component, ProgressBar)[0]
      expect(progress.props.now).to.equal(67)
    })

  })

  context('Best match - 100%', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicator
          questionsAnswered={36}
          totalQuestions={36}
          onSubmit={onSubmit} />
      )
    })

    it('should have a match level of \'Best!\'', () => {
      const definition =
        TestUtils.scryRenderedDOMComponentsWithTag(component, 'dd')[0]
      expect(definition.textContent).to.equal('Best!')
    })

    it('should pass a match level of 3 to the heart', () => {
      const heart =
        TestUtils.scryRenderedComponentsWithType(component, SurveyCompletionIndicatorHeart)[0]
      expect(heart.props.level).to.equal(3)
    })

    it('should pass a progress value of 100%', () => {
      const progress =
        TestUtils.scryRenderedComponentsWithType(component, ProgressBar)[0]
      expect(progress.props.now).to.equal(100)
    })

  })

  context('On Results Page', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicator
          questionsAnswered={15}
          totalQuestions={36}
          resultsPage
          onSubmit={onSubmit} />
      )
    })

    it('should have a button with text \'Improve Matches\'', () => {

      const button = TestUtils.scryRenderedComponentsWithType(component, Button)[0]
      expect(button.props.children).to.equal('Improve Results')

    })

  })

})
