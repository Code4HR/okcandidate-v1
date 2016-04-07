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
    const tab = this.routes.indexOf(window.location.pathname) + 1
    return tab > 0 ?
      tab :
      this.activeTabIndex
  }

  get routes() {
    return this.tabs.map(tab => tab.route)
  }

  get tabs() {
    return [{
      route: '/survey',
      useable: true,
      text: 'Select a Ward'
    }, {
      route: '/survey/questions',
      useable: this.props.hasWard,
      text: 'Survey'
    }, {
      route: '/survey/results',
      useable: this.props.hasMatch,
      text: 'Results'
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
    return (
      <article>
        <Breadcrumb style={navStyle}>
          { this.tabs.map(this.toItem()) }
        </Breadcrumb>

        { this.props.children }
      </article>
    )
  }

  toItem() {
    return (tab, index) => this.isTabInactive(index) && tab.useable ?
      this.toClickableTab(tab) :
      this.toActiveTab(tab)
  }

  isTabInactive(index) {
    return index !== this.currentTab - 1
  }

  toClickableTab({route, text}) {
    return (
      <Breadcrumb.Item onClick={() => browserHistory.push(route)}>
        { text }
      </Breadcrumb.Item>
    )
  }

  toActiveTab({text}) {
    return (
      <Breadcrumb.Item active>
        { text }
      </Breadcrumb.Item>
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
