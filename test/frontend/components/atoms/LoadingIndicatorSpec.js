import React, { PropTypes } from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import Loader from 'react-loaders'
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

  context('message container', () => {
    let container

    beforeEach(() => {
      container = TestUtils.scryRenderedDOMComponentsWithTag(indicator, 'div')[0]
    })

    it('will exist', () => {
      expect(container).to.be.ok
    })

    context('style', () => {
      let style

      beforeEach(() => {
        style = container.style
      })

      it('will exist', () => {
        expect(style).to.be.ok
      })

      it('will have a text-align rule', () => {
        expect(style).to.have.property('textAlign')
      })

      it('will have a text-align of "center"', () => {
        expect(style.textAlign).to.equal('center')
      })

      it('will have a padding-top rule', () => {
        expect(style).to.have.property('paddingTop')
      })

      it('will have a 2em top padding', () => {
        expect(style.paddingTop).to.equal('2em')
      })
    })
  })

  context('loader', () => {
    let loader

    beforeEach(() => {
      loader = TestUtils.scryRenderedComponentsWithType(indicator, Loader)[0]
    })

    it('will exist', () => {
      expect(loader).to.be.ok
    })

    it('will have an active property', () => {
      expect(loader).to.have.property('props')
        .that.have.property('active')
    })

    it('will have a ball-pulse type', () => {
      expect(loader).to.have.property('props')
        .that.have.property('type')
        .that.equal('ball-pulse')
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

    context('style', () => {
      let style

      beforeEach(() => {
        style = element.style
      })

      it('will exist', () => {
        expect(style).to.be.ok
      })

      it('will have a font-size attribute', () => {
        expect(style).to.have.property('fontSize')
      })

      it('will have a font-size of 1.5ems', () => {
        expect(style.fontSize).to.equal('1.5em')
      })
    })
  })
})
