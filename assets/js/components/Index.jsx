import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

// Top Level Components
import Frame from './environments/Frame.jsx'
import AdminDashboard from './environments/AdminDashboard.jsx'
import SurveyPage from './environments/SurveyPage.jsx'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Frame}>
          <Route path="admin" component={AdminDashboard}/>
          <Route path="survey" component={SurveyPage} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />
  , document.body
);
