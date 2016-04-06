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
    return this.tabs.map(tab => tab.route)
  }

  get tabs() {
    return [{
      route: '/survey',
      useable: true
    }, {
      route: '/survey/questions',
      useable: this.props.hasWard
    }, {
      route: '/survey/results',
      useable: this.props.hasMatch
    }]
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
    const current = this.currentTab - 1,
      [ward, survey, results] = this.tabs.map((tab, i) =>
        i === current || !tab.useable ?
          { active: true } :
          { onClick: () => browserHistory.push(tab.route) })
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
  children: PropTypes.any,
  hasWard: PropTypes.boolean,
  hasMatch: PropTypes.boolean
}

export default connect(
  state => ({
    hasWard: state.survey.ward.hasOwnProperty('name'),
    hasMatch: state.survey.candidateMatch.hasOwnProperty('id')
  }), null, null, {
    withRef: true
  }
)(SurveyPageNav)
