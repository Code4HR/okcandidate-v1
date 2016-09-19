import React from 'react'
import { expect } from 'chai'
import TestUtils from 'react-addons-test-utils'
import categories from './../fixtures/categories'
import questions from './../fixtures/questions'
import sinon from 'sinon'

import SurveyQuestionCategoryPager from '../../../../assets/js/components/organisms/SurveyQuestionCategoryPager'

describe('Survey Question Category Pager Test', () => {

  let component, setIndex, dispatch

  beforeEach(() => {

    setIndex = sinon.stub()
    dispatch = sinon.stub()

    component = TestUtils.renderIntoDocument(
      <SurveyQuestionCategoryPager
        categories={categories}
        question={questions[6]}
        setIndex={setIndex}
        dispatch={dispatch} />
    )

  })

  it('should exist', () => {
    expect(component).to.be.ok
  })

  describe('#getCategoryIndex', () => {

    it('should return the index of a category in an array of categories given an ID', () => {
      // it is given that the third catgeory in the array of categories
      // has an id of 3.
      const result = component.getCategoryIndex(categories, 3)
      expect(result).to.equal(2)
    })

  })

  describe('#selectCategory', () => {

    it('Should set the question pager index to that of the first question in a ' +
       'selected category', () => {
      const fakeEvent = {
        target: {
          value: '2'
        }
      }
      component.selectCategory(fakeEvent)
      sinon.assert.calledWith(setIndex, 6)
    })

  })

  describe('#nextCategory', () => {

    it('should set the question pager index to that of the first question in ' +
       'the next category', () => {
      component.nextCategory()
      sinon.assert.calledWith(setIndex, 14)
    })

  })

  describe('#prevCategory', () => {

    it('should set the question pager index to that of the first question in ' +
       'the next category', () => {
      component.prevCategory()
      sinon.assert.calledWith(setIndex, 0)
    })

  })

})
