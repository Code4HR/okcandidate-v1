import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Breadcrumb } from 'react-bootstrap'

const navStyle = {
  marginBottom: '2em'
}

class SurveyPageNav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tab: this.currentTab
    }
  }

  get currentTab() {
    const current = this.routes.indexOf(window.location.pathname) + 1
    return current > 0 ?
      current :
      this.activeTabIndex
  }

  get routes() {
    return [ '/survey', '/survey/questions', '/survey/results' ]
  }

  get activeTabIndex() {
    return this.state ?
      this.state.tab :
      1
  }

  set activeTabIndex(index) {
    this.setState({
      tab: index
    })
  }

  render() {
    const tab = this.currentTab - 1,
      [ward, survey, results] = this.routes.map((route, i) =>
        i < tab ?
          { onClick: () => browserHistory.push(route) } :
          { active: 'active' })
    return (
      <article>
        <Breadcrumb style={navStyle}>
          <Breadcrumb.Item {...ward}>
            Select a Ward
          </Breadcrumb.Item>

          <Breadcrumb.Item {...survey}>
            Survey
          </Breadcrumb.Item>

          <Breadcrumb.Item {...results}>
            Results
          </Breadcrumb.Item>
        </Breadcrumb>

        { this.props.children }
      </article>
    )
  }
}

SurveyPageNav.propTypes = {
  children: PropTypes.any
}

export default connect(
  state => ({
    responses: state.survey.responses,
    ward: state.survey.ward.name,
    tab: state.tab
  }), null, null, {
    withRef: true
  }
)(SurveyPageNav)
