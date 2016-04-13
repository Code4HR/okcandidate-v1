import React from 'react'
import { Panel, Label } from 'react-bootstrap'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import CandidateMatchCategory
  from '../../../../assets/js/components/organisms/CandidateMatchCategory'

describe('The candidate match category component', () => {
  let category

  beforeEach(() => {
    category = TestUtils.renderIntoDocument(
      <CandidateMatchCategory
        categoryName="Test Category"
        categoryMatch="94"
        questions={[]} />
    )
  })

  it('will exist', () => {
    expect(category).to.be.ok
  })

  it('will have a categoryName property', () => {
    expect(category).to.have.property('props')
      .that.have.property('categoryName')
      .that.is.a('string')
      .that.not.empty
  })

  it('will have a categoryMatch property', () => {
    expect(category).to.have.property('props')
      .that.have.property('categoryMatch')
      .that.is.a('string')
      .that.not.empty
  })

  context('panel', () => {
    let panel

    beforeEach(() => {
      panel = TestUtils.scryRenderedComponentsWithType(category, Panel)[0]
    })

    it('will exist', () => {
      expect(panel).to.be.ok
    })

    context('div', () => {
      let div

      beforeEach(() => {
        // why is this the third one in?
        div = TestUtils.scryRenderedDOMComponentsWithTag(panel, 'div')[2]
      })

      it('will exist', () => {
        expect(div).to.be.ok
      })

      it('will have a flex display style', () => {
        expect(div).to.have.property('style')
          .that.have.property('display')
          .that.equal('flex')
      })

      it('will align its items in the center', () => {
        expect(div).to.have.property('style')
          .that.have.property('alignItems')
          .that.equal('center')
      })
    })

    context('header', () => {
      let header

      beforeEach(() => {
        header = TestUtils.scryRenderedDOMComponentsWithTag(panel, 'h5')[0]
      })

      it('will exist', () => {
        expect(header).to.be.ok
      })

      it('will include the category name in its text', () => {
        expect(header).to.have.property('textContent')
          .that.include(category.props.categoryName)
      })

      it('will have a flex-grow of 1', () => {
        expect(header).to.have.property('style')
          .that.have.property('flexGrow')
          .that.equal('1')
      })
    })

    context('label', () => {
      let label

      beforeEach(() => {
        label = TestUtils.scryRenderedComponentsWithType(panel, Label)[0]
      })

      it('will exist', () => {
        expect(label).to.be.ok
      })

      it('will have a danger bsStyle', () => {
        expect(label).to.have.property('props')
          .that.have.property('bsStyle')
          .that.equal('danger')
      })

      it('will have the match as a percentage for its children', () => {
        expect(label.props.children.join(''))
          .to.equal(`${category.props.categoryMatch}%`)
      })
    })
  })
})
