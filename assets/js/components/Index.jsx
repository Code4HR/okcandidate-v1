import React, { Component} from 'react';
import ReactDOM from 'react-dom'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducer from './../redux/reducer'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import './../../../node_modules/loaders.css/loaders.min.css'
import './../../style/main.css'

// Redux Setup
const logger = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

// Top Level Components
import Frame from './environments/Frame.jsx'
import AdminDashboard from './environments/AdminDashboard.jsx'
import WardFinderPage from './ecosystems/WardFinderPage.jsx'
import ResultsPage from './ecosystems/ResultsPage.jsx'
import SurveyPage from './ecosystems/SurveyPage.jsx'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Frame}>
          <IndexRoute component={WardFinderPage} />
          <Route path="survey" component={SurveyPage} />
          <Route path="results/:id" component={ResultsPage} />
          <Route path="admin" component={AdminDashboard}/>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
);
