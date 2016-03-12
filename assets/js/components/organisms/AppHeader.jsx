import React, { Component } from 'react'
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'

class AppHeader extends Component {

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">OKCandidate</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="/survey">Survey</NavItem>
          <NavItem eventKey={1} href="/admin">Login</NavItem>
        </Nav>
      </Navbar>
    )
  }

}

AppHeader.propTypes = {}

export default AppHeader
