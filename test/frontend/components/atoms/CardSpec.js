import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import Card from '../../../../assets/js/components/atoms/Card'

describe('The card component', () => {
  let card, style, children, className

  beforeEach(() => {
    style = { someRule: 'test-value' }
    children = [ 'first child', 'second child' ]
    className = 'garbage-test'
    card = TestUtils.renderIntoDocument(
      <Card className={className} style={style}>
        {children}
      </Card>
    )
  })

  it('will exist', () => {
    expect(card).to.be.ok
  })

  it('will have a style property', () => {
    expect(card).to.have.property('props')
      .that.have.property('style')
      .that.equal(style)
  })

  it('will have a children property', () => {
    expect(card).to.have.property('props')
      .that.have.property('children')
      .that.equal(children)
  })

  it('will have a className property', () => {
    expect(card).to.have.property('props')
      .that.have.property('className')
      .that.equal(className)
  })

  context('section', () => {
    let section

    beforeEach(() => {
      section = TestUtils.scryRenderedDOMComponentsWithTag(card, 'section')[0]
    })

    it('will exist', () => {
      expect(section).to.be.ok
    })

    it('will have the parent class name', () => {
      expect(section).to.have.property('className')
        .that.equal(className)
    })
  })
})
