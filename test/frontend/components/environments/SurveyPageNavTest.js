import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { Breadcrumb } from 'react-bootstrap'
import SurveyQuestion from '../../../../assets/js/components/organisms/SurveyQuestion'
import SurveyPageNav from '../../../../assets/js/components/environments/SurveyPageNav'

import TestUtils from 'react-addons-test-utils'

describe.skip('The survey page navigator', () => {
  let nav, state, store

  beforeEach(() => {
    state = sinon.stub()
    store = {
      getState: state,
      subscribe: sinon.stub()
    }
    state.returns({
      survey: {
        ward: {},
        candidateMatch: {}
      }
    })
    nav = TestUtils.renderIntoDocument(
      <SurveyPageNav store={store} />
    ).getWrappedInstance()
  })

  context('get active method', () => {
    it('returns 1 for the first tab for new navigators', () => {
      expect(nav.activeTabIndex).to.equal(1)
    })
  })

  context('set active method', () => {
    it('mutates the current tab', () => {
      let i = 2
      nav.activeTabIndex = i
      expect(nav.activeTabIndex).to.equal(i)
    })
  })

  context('props', () => {
    let props

    beforeEach(() => {
      props = nav.props
    })

    it('will have a hasWard property', () => {
      expect(props).to.have.property('hasWard')
    })

    it('will have a hasMatch property', () => {
      expect(props).to.have.property('hasMatch')
    })
  })

  context('breadcrumb', () => {
    let breadcrumb

    beforeEach(() => {
      breadcrumb = TestUtils.scryRenderedComponentsWithType(nav, Breadcrumb)[0]
    })

    it('will exist', () => {
      expect(breadcrumb).to.exist
    })

    context('style', () => {
      let style

      beforeEach(() => {
        style = breadcrumb.props.style
      })

      it('will contain a bottom margin of 2em', () => {
        expect(style).to.have.property('marginBottom').that.equal('2em')
      })
    })

    context('tabs', () => {
      let tabs

      beforeEach(() => {
        tabs = TestUtils.scryRenderedComponentsWithType(breadcrumb,
          Breadcrumb.Item)
      })

      it('will total 3', () => {
        expect(tabs).to.have.length(3)
      })

      context('for the ward', () => {
        let ward

        beforeEach(() => {
          ward = tabs[0]
        })

        it('will display "Select a Ward"', () => {
          expect(ward.props.children).to.equal('Select a Ward')
        })

        context('when active', () => {
          beforeEach(() => {
            nav.activeTabIndex = 1
          })

          it('will have an active property', () => {
            expect(ward.props.active).to.exist
          })
        })
      })

      context('for the survey', () => {
        let survey

        beforeEach(() => {
          survey = tabs[1]
        })

        it('will display "Survey"', () => {
          expect(survey.props.children).to.equal('Survey')
        })

        context('when active', () => {
          beforeEach(() => {
            nav.activeTabIndex = 2
          })

          it('will have an active property', () => {
            expect(survey.props.active).to.exist
          })
        })
      })

      context('for the results', () => {
        let results

        beforeEach(() => {
          results = tabs[2]
        })

        it('will display "Results"', () => {
          expect(results.props.children).to.equal('Results')
        })

        context('when active', () => {
          beforeEach(() => {
            nav.activeTabIndex = 3
          })

          it('will have an active property', () => {
            expect(results.props.active).to.exist
          })
        })
      })
    })
  })

  context('when just starting out', () => {
    let tabs

    beforeEach(() => {
      let breadcrumb =
        TestUtils.scryRenderedComponentsWithType(nav, Breadcrumb)[0]
      tabs =
        TestUtils.scryRenderedComponentsWithType(breadcrumb, Breadcrumb.Item)
    })

    context('the ward tab', () => {
      let ward

      beforeEach(() => {
        ward = tabs[0]
      })

      context('when inactive', () => {
        beforeEach(() => {
          nav.activeTabIndex = 2
        })

        it('will have an onClick property', () => {
          expect(ward.props).to.have.property('onClick')
        })
      })
    })

    context('the survey tab', () => {
      let survey

      beforeEach(() => {
        survey = tabs[1]
      })

      context('when inactive', () => {
        beforeEach(() => {
          nav.activeTabIndex = 1
        })

        it('will have an active property', () => {
          expect(survey.props).to.have.property('active')
        })
      })
    })

    context('the results tab', () => {
      let results

      beforeEach(() => {
        results = tabs[2]
      })

      context('when inactive', () => {
        beforeEach(() => {
          nav.activeTabIndex = 1
        })

        it('will have an active property', () => {
          expect(results.props).to.have.property('active')
        })
      })
    })
  })

  context('after selecting a ward', () => {
    let tabs

    beforeEach(() => {
      let breadcrumb
      state.returns({
        survey: {
          ward: { name: 'test' },
          candidateMatch: {}
        }
      })
      nav = TestUtils.renderIntoDocument(
        <SurveyPageNav store={store} />
      ).getWrappedInstance()
      breadcrumb = TestUtils.scryRenderedComponentsWithType(nav, Breadcrumb)[0]
      tabs =
        TestUtils.scryRenderedComponentsWithType(breadcrumb, Breadcrumb.Item)
    })

    context('the ward tab', () => {
      let ward

      beforeEach(() => {
        ward = tabs[0]
      })

      context('when inactive', () => {
        beforeEach(() => {
          nav.activeTabIndex = 2
        })

        it('will have an onClick property', () => {
          expect(ward.props).to.have.property('onClick')
        })
      })
    })

    context('the survey tab', () => {
      let survey

      beforeEach(() => {
        survey = tabs[1]
      })

      context('when inactive', () => {
        beforeEach(() => {
          nav.activeTabIndex = 1
        })

        it('will have an onClick property', () => {
          expect(survey.props).to.have.property('onClick')
        })
      })
    })

    context('the results tab', () => {
      let results

      beforeEach(() => {
        results = tabs[2]
      })

      context('when inactive', () => {
        beforeEach(() => {
          nav.activeTabIndex = 1
        })

        it('will have an active property', () => {
          expect(results.props).to.have.property('active')
        })
      })
    })
  })

  context('after getting a candidate match', () => {
    let tabs

    beforeEach(() => {
      let breadcrumb
      state.returns({
        survey: {
          ward: { name: 'test' },
          candidateMatch: { id: 1 }
        }
      })
      nav = TestUtils.renderIntoDocument(
        <SurveyPageNav store={store} />
      ).getWrappedInstance()
      breadcrumb = TestUtils.scryRenderedComponentsWithType(nav, Breadcrumb)[0]
      tabs =
        TestUtils.scryRenderedComponentsWithType(breadcrumb, Breadcrumb.Item)
    })

    context('the ward tab', () => {
      let ward

      beforeEach(() => {
        ward = tabs[0]
      })

      context('when inactive', () => {
        beforeEach(() => {
          nav.activeTabIndex = 2
        })

        it('will have an onClick property', () => {
          expect(ward.props).to.have.property('onClick')
        })
      })
    })

    context('the survey tab', () => {
      let survey

      beforeEach(() => {
        survey = tabs[1]
      })

      context('when inactive', () => {
        beforeEach(() => {
          nav.activeTabIndex = 1
        })

        it('will have an onClick property', () => {
          expect(survey.props).to.have.property('onClick')
        })
      })
    })

    context('the results tab', () => {
      let results

      beforeEach(() => {
        results = tabs[2]
      })

      context('when inactive', () => {
        beforeEach(() => {
          nav.activeTabIndex = 1
        })

        it('will have an onClick property', () => {
          expect(results.props).to.have.property('onClick')
        })
      })
    })
  })
})
