import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import CandidateMatchProfileBadge
  from '../../../../assets/js/components/molecules/CandidateMatchProfileBadge'

describe('The candidate badge', () => {
  let badge

  beforeEach(() => {
    badge = TestUtils.renderIntoDocument(
      <CandidateMatchProfileBadge />
    )
  })

  it('will exist', () => {
    expect(badge).to.be.ok
  })

  context('container style', () => {
    it('will have a relative position', () => {
      expect(badge.containerStyle).to.have.property('position')
        .that.equal('relative')
    })

    it('will have a flexible display', () => {
      expect(badge.containerStyle).to.have.property('display')
        .that.equal('flex')
    })

    it('will align its items in the center', () => {
      expect(badge.containerStyle).to.have.property('alignItems')
        .that.equal('center')
    })

    context('with additional style rules', () => {
      beforeEach(() => {
        badge = TestUtils.renderIntoDocument(
          <CandidateMatchProfileBadge
            style={{color: '#000000' }} />
        )
      })

      it('will have a relative position', () => {
        expect(badge.containerStyle).to.have.property('position')
          .that.equal('relative')
      })

      it('will have a flexible display', () => {
        expect(badge.containerStyle).to.have.property('display')
          .that.equal('flex')
      })

      it('will align its items in the center', () => {
        expect(badge.containerStyle).to.have.property('alignItems')
          .that.equal('center')
      })

      it('will have the new style properties', () => {
        expect(badge.containerStyle).to.have.property('color')
          .that.equal('#000000')
      })
    })
  })

  context('first section', () => {
    let section

    beforeEach(() => {
      section = TestUtils.scryRenderedDOMComponentsWithTag(badge, 'section')[0]
    })

    it('will exist', () => {
      expect(section).to.be.ok
    })

    it('will have the same style as the container style accessor', () => {
      expect(section).to.have.property('props')
        .that.have.property('style')
        .that.deep.equal(badge.containerStyle)
    })

    context('with additional style rules', () => {
      beforeEach(() => {
        badge = TestUtils.renderIntoDocument(
          <CandidateMatchProfileBadge
            style={{ color: '#000000' }} />
        )
        section =
          TestUtils.scryRenderedDOMComponentsWithTag(badge, 'section')[0]
      })

      it('will exist', () => {
        expect(section).to.be.ok
      })

      it('will have the same style as the container style accessor', () => {
        expect(section).to.have.property('props')
          .that.have.property('style')
          .that.deep.equal(badge.containerStyle)
      })
    })
  })
})
