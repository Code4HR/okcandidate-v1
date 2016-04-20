import React, { PropTypes } from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import LoadingIndicator
  from '../../../../assets/js/components/atoms/LoadingIndicator'

describe('The loading indicator component', () => {
  let indicator, message

  beforeEach(() => {
    message = 'test message'
    indicator = TestUtils.renderIntoDocument(
      <LoadingIndicator message={message} />
    )
  })

  it('will exist', () => {
    expect(indicator).to.be.ok
  })

  context('prop types', () => {
    let types

    beforeEach(() => {
      types = LoadingIndicator.propTypes
    })

    it('will exist', () => {
      expect(types).to.be.ok
    })

    it('will have a message property', () => {
      expect(types).to.have.property('message')
    })

    context('message property', () => {
      let message

      beforeEach(() => {
        message = LoadingIndicator.propTypes.message
      })

      it('will have a string type', () => {
        expect(message).to.equal(PropTypes.string)
      })
    })
  })

  it('will have a message property', () => {
    expect(indicator).to.have.property('props')
      .that.have.property('message')
      .that.equal(message)
  })

  context('spinner', () => {
    let spinner

    beforeEach(() => {
      spinner = TestUtils.scryRenderedDOMComponentsWithTag(indicator, 'i')[0]
    })

    it('will exist', () => {
      expect(spinner).to.be.ok
    })

    it('will have a spinner class', () => {
      expect(spinner).to.have.property('className')
        .that.contain('fa-spinner')
    })
  })

  context('message element', () => {
    let element

    beforeEach(() => {
      element = TestUtils.scryRenderedDOMComponentsWithTag(indicator, 'span')[0]
    })

    it('will exist', () => {
      expect(element).to.be.ok
    })

    it('will have the message property as its text', () => {
      expect(element).to.have.property('textContent')
        .that.equal(indicator.props.message)
    })
  })
})

