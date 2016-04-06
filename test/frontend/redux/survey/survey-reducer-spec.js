import reducer, { initialState } from '../../../../assets/js/redux/survey/survey-reducer'
import { expect } from 'chai'

describe('The survey reducer', () => {
  let state

  beforeEach(() => {
    state = reducer(initialState, {
      type: ''
    })
  })

  it('will have a ward attribute', () => {
    expect(state).to.have.property('ward').that.is.an('object')
  })

  it('will have a candidateMatch attribute', () => {
    expect(state).to.have.property('candidateMatch').that.is.an('object')
  })
})

