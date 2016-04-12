import React from 'react'
import { Panel, Button } from 'react-bootstrap'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import CandidateMatchCandidate
  from '../../../../assets/js/components/organisms/CandidateMatchCandidate'

describe('The results candidate component', () => {
  let candidate

  beforeEach(() => {
    candidate = TestUtils.renderIntoDocument(
      <CandidateMatchCandidate />
    )
  })

  it('will exist', () => {
    expect(candidate).to.be.ok
  })

  context('button', () => {
    let button

    beforeEach(() => {
      button = TestUtils.scryRenderedComponentsWithType(candidate, Button)[0]
    })

    it('will exist', () => {
      expect(button).to.be.ok
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
  })
})
