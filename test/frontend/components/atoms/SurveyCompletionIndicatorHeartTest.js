import React from 'react'
import { expect } from 'chai'
import TestUtils from 'react-addons-test-utils'

import SurveyCompletionIndicatorHeart
  from '../../../../assets/js/components/atoms/SurveyCompletionIndicatorHeart.jsx'

describe('Survey Completion Indicator Heart', () => {

  let component

  context('Spec', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicatorHeart level={0} />
      )
    })

    it('should exist', () => {
      expect(component).to.be.ok
    })

  })

  context('Completion Level 0', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicatorHeart level={0} />
      )
    })

    it('should give the inner heart a scale of 1/4', () => {
      const heart = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[0]
      expect(heart.style.transform).to.equal('scale(0.25)')
    })

  })

  context('Completion Level 1', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicatorHeart level={1} />
      )
    })

    it('should give the inner heart a scale of 1/2', () => {
      const heart = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[0]
      expect(heart.style.transform).to.equal('scale(0.5)')
    })

  })

  context('Completion Level 2', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicatorHeart level={2} />
      )
    })

    it('should give the inner heart a scale of 3/4', () => {
      const heart = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[0]
      expect(heart.style.transform).to.equal('scale(0.75)')
    })

  })

  context('Completion Level 3', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyCompletionIndicatorHeart level={3} />
      )
    })

    it('should give the inner heart a scale of 1', () => {
      const heart = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[0]
      expect(heart.style.transform).to.equal('scale(1)')
    })

  })

})
