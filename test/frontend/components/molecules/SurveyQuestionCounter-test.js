import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import SurveyQuestionCounter
  from './../../../../assets/js/components/molecules/SurveyQuestionCounter.jsx'
import TestUtils from 'react-addons-test-utils'

describe('Survey Question Counter', () => {

  describe('Before last question', () => {

    let component

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyQuestionCounter total={15} index={3} />
      )
    })

    it('should display how many questions are remaining', () => {

      const text = component.refs.text._reactInternalComponent
                            ._renderedChildren['.0']
                            ._currentElement.props.children

      expect(text).to.equal(12)

    })

  })

  describe('On last question', () => {

    let component

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <SurveyQuestionCounter total={15} index={14} />
      )
    })

    it('should display something like \'Last question\'', () => {

      const text = component.refs.text._reactInternalComponent
                            ._renderedChildren['.0']
                            ._currentElement.props.children

      expect(text).to.equal('Last question!')

    })

  })

})
