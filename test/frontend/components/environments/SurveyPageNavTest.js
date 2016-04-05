import React from 'react/addons'
import { expect } from 'chai'
import { Breadcrumb } from 'react-bootstrap'
import SurveyQuestion from '../../../../assets/js/components/organisms/SurveyQuestion'
import SurveyPageNav from '../../../../assets/js/components/environments/SurveyPageNav'

var TestUtils = React.addons.TestUtils

describe('The survey page navigator', () => {
  let nav

  beforeEach(() => {
    nav = TestUtils.renderIntoDocument(
      <SurveyPageNav />
    )
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

    context('', () => {
      let items

      beforeEach(() => {
        items = TestUtils.scryRenderedComponentsWithType(breadcrumb,
          Breadcrumb.Item)
      })

      it('will have 3 tabs', () => {
        expect(items).to.have.length(3)
      })

      context('ward', () => {
        let ward

        beforeEach(() => {
          ward = items[0]
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

        context('when inactive', () => {
          beforeEach(() => {
            nav.activeTabIndex = 2
          })

          it('will have an onClick property', () => {
            expect(ward.props.onClick).to.exist
          })

          context('the onClick property', () => {
            let onClick

            beforeEach(() => {
              onClick = ward.props.onClick
            })
          })
        })
      })

      context('survey', () => {
        let survey

        beforeEach(() => {
          survey = items[1]
        })

        it('will display "Survey"', () => {
          expect(survey.props.children).to.equal('Survey')
        })

        context('when selecting a ward', () => {
          beforeEach(() => {
            nav.activeTabIndex = 1
          })

          it('will have an active property', () => {
            expect(survey.props.active).to.exist
          })

          afterEach(() => {
            nav.activeTabIndex = 1
          })
        })

        context('when filling out the survey', () => {
          beforeEach(() => {
            nav.activeTabIndex = 2
          })

          it('will have an active property', () => {
            expect(survey.props.active).to.exist
          })

          afterEach(() => {
            nav.activeTabIndex = 1
          })
        })

        context('when reviewing the results', () => {
          beforeEach(() => {
            nav.activeTabIndex = 3
          })

          it('will have an onClick property', () => {
            expect(survey.props.onClick).to.exist
          })

          afterEach(() => {
            nav.activeTabIndex = 1
          })
        })
      })

      context('results', () => {
        let results

        beforeEach(() => {
          results = items[2]
        })

        it('will display "Results"', () => {
          expect(results.props.children).to.equal('Results')
        })

        it('will have an active property', () => {
          expect(results.props.active).to.exist
        })

      })
    })
  })
})
