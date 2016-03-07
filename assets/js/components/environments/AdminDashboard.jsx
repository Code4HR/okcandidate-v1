import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  setAdminDashboardMood
} from './../../redux/admin/admin-actions'

class AdminDashboard extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(setAdminDashboardMood('Fine, thanks for asking.'))
  }

  render() {
    return (
      <article>
        <h1>Admin Dashboard</h1>
        <p>This is where the adminstrator will create and manage surveys.</p>
        <p>At present, the administrator's mood is: <pre>{this.props.admin.mood}</pre></p>
      </article>
    )
  }
}

AdminDashboard.propTypes = {
  admin: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    admin: state.admin
  })
)(AdminDashboard)
