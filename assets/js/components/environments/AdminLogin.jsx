import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class AdminDashboard extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <article>
        <h1>Admin Login Screen</h1>

        <form method="post" action="/login">
          Email:<br><input type="text" name="email" /></br> 
          Password:<br><input type="password" name="password" /></br>
          <input type="submit" value="Login" />
        </form>
      </article>
    )
  }
}

export default connect(
  state => ({
    survey: state.survey
  })
)(AdminDashboard)