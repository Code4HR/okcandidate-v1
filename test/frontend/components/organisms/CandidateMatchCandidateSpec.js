import React from 'react'
import { Panel, Button, Glyphicon } from 'react-bootstrap'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import CandidateMatchCandidate
  from '../../../../assets/js/components/organisms/CandidateMatchCandidate'
import CandidateMatchProfileBadge
  from '../../../../assets/js/components/molecules/CandidateMatchProfileBadge'

describe('The results candidate component', () => {
  let candidate

  beforeEach(() => {
    candidate = TestUtils.renderIntoDocument(
      <CandidateMatchCandidate
        categoryMatchScores={[]} />
    )
  })

  it('will exist', () => {
    expect(candidate).to.be.ok
  })

  context('flexbox', () => {
    let flexbox

    beforeEach(() => {
      flexbox = TestUtils.scryRenderedDOMComponentsWithTag(candidate, 'div')[0]
    })

    it('will exist', () => {
      expect(flexbox).to.be.ok
    })

    it('will have a flex display style', () => {
      expect(flexbox).to.have.property('style')
        .that.is.an('object')
        .that.have.property('display')
        .that.is.a('string')
        .that.equal('flex')
    })

    context('button', () => {
      let button

      beforeEach(() => {
        button = TestUtils.scryRenderedComponentsWithType(candidate, Button)[0]
      })

      it('will exist', () => {
        expect(button).to.be.ok
      })

      it('will have a downwards chevron for an icon', () => {
        let icon =
          TestUtils.scryRenderedComponentsWithType(button, Glyphicon)[0]
        expect(icon).to.have.property('props')
          .that.have.property('glyph')
          .that.equal('chevron-down')
      })

      context('onclick', () => {
        let onclick

        beforeEach(() => {
          onclick = button.props.onClick
        })

        it('will exist', () => {
          expect(onclick).to.be.ok
        })

        it('will toggle the showCategory state', () => {
          onclick()
          expect(candidate.state.showCategory).to.be.true
        })

        it('will show an upwards chevron for an icon', () => {
          let icon =
            TestUtils.scryRenderedComponentsWithType(button, Glyphicon)[0]
          onclick()
          expect(icon).to.have.property('props')
            .that.have.property('glyph')
            .that.equal('chevron-up')
        })
      })
    })

    context('badge', () => {
      let badge

      beforeEach(() => {
        badge =
          TestUtils.scryRenderedComponentsWithType(
            candidate, CandidateMatchProfileBadge)[0]
      })

      it('will exist', () => {
        expect(badge).to.be.ok
      })

      it('will have a flex style property of 1', () => {
        expect(badge).to.have.property('props')
          .that.have.property('style')
          .that.have.property('flex')
          .that.equal(1)
      })
    })
  })

  context('panel', () => {
    let panel

    beforeEach(() => {
      panel = TestUtils.scryRenderedComponentsWithType(candidate, Panel)[0]
    })

    it('will exist', () => {
      expect(panel).to.be.ok
    })

    it('will have a collapsible property', () => {
      expect(panel).to.have.property('props')
        .that.have.property('collapsible')
        .that.is.true
    })

    it('will have an expanded property', () => {
      expect(panel).to.have.property('props')
        .that.have.property('expanded')
        .that.equal(candidate.state.showCategory)
    })

    it('will have a borderless style', () => {
      expect(panel).to.have.property('props')
        .that.have.property('style')
        .that.have.property('border')
        .that.equal('none')
    })
  })
})
