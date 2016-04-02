import React, { Component, PropTypes } from 'react'

import { browserHistory } from 'react-router'

import {
  Nav,
  NavItem
} from 'react-bootstrap'

const navStyle = {
  marginBottom: '2em'
}

class SurveyPageNav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tab: 1
    }
  }

  handleSelect(tabIndex) {

    this.setState({
      tab: tabIndex
    })

    let route
    switch (tabIndex) {
        case 1:
          route = '/survey'
          break
        case 2:
          route = '/survey/questions'
          break
        case 3:
          route = '/survey/results'
          break
    }

    browserHistory.push(route)

  }

  render() {
    return (
      <article>

        <Nav
          style={navStyle}
          bsStyle="pills"
          activeKey={this.state.tab}
          onSelect={this.handleSelect.bind(this)}>
          <NavItem href="/survey" eventKey={1}>Select a Ward</NavItem>
          <NavItem href="/survey/questions" eventKey={2}>Survey</NavItem>
          <NavItem href="/survey/results" eventKey={3}>Results</NavItem>
        </Nav>

        { this.props.children }

      </article>
    )
  }
}

SurveyPageNav.propTypes = {
  children: PropTypes.any
}

export default SurveyPageNav
