import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { expect } from 'chai'

import CandidateMatchRating
  from '../../../../assets/js/components/atoms/CandidateMatchRating'
import colours
  from '../../../../assets/js/components/style/colors'

describe('The candidate match rating component', () => {
  let rating

  beforeEach(() => {
    rating = TestUtils.renderIntoDocument(
      <CandidateMatchRating compositeMatchScore="0" />
    )
  })

  it('will exist', () => {
    expect(rating).to.be.ok
  })

  context('colour', () => {
    let colour

    beforeEach(() => {
      colour = rating.colour
    })

    it('will exist', () => {
      expect(colour).to.be.ok
    })

    it('will start with the red colour in the common style colours', () => {
      expect(colour).to.equal(colours.red)
    })
  })

  context('container style', () => {
    let style

    beforeEach(() => {
      style = rating.getContainerStyle()
    })

    it('will exist', () => {
      expect(style).to.be.ok
    })

    it('will have the common red style colour in its background', () => {
      expect(style).to.have.property('background')
        .that.equal(colours.red)
    })

    context('with a less than 50% match', () => {
      beforeEach(() => {
        rating = TestUtils.renderIntoDocument(
          <CandidateMatchRating compositeMatchScore="25" />
        )
        style = rating.getContainerStyle()
      })
      
      it('will have a red background', () => {
        expect(style).to.have.property('background')
          .that.equal(colours.red)
      })
    })

    context('with a match between 50% and 60%', () => {
      beforeEach(() => {
        rating = TestUtils.renderIntoDocument(
          <CandidateMatchRating compositeMatchScore="55" />
        )
        style = rating.getContainerStyle()
      })

      it('will have an orange background', () => {
        expect(style).to.have.property('background')
          .that.equal(colours.orange)
      })
    })

    context('with a match between 60% and 80%', () => {
      beforeEach(() => {
        rating = TestUtils.renderIntoDocument(
          <CandidateMatchRating compositeMatchScore="70" />
        )
        style = rating.getContainerStyle()
      })

      it('will have a yellow background', () => {
        expect(style).to.have.property('background')
          .that.equal(colours.yellow)
      })
    })

    context('with a match above 80%', () => {
      beforeEach(() => {
        rating = TestUtils.renderIntoDocument(
          <CandidateMatchRating compositeMatchScore="85" />
        )
        style = rating.getContainerStyle()
      })

      it('will have a green background', () => {
        expect(style).to.have.property('background')
          .that.equal(colours.green)
      })
    })
  })
})
