import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reducer from './../redux/reducer'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import './../../../node_modules/loaders.css/loaders.min.css'
import './../../../node_modules/purecss/build/pure-min.css'
import './../../style/main.css'

// Redux Setup
const NODE_ENV = process.env.NODE_ENV

let logger, store

if (NODE_ENV === 'production') {
  store = createStore(reducer, applyMiddleware(thunk))
}
else {
  logger = createLogger()
  store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
  )
}

// Top Level Components
import Frame from './environments/Frame.jsx'
import AdminLogin from './environments/AdminLogin.jsx'
import AdminDashboard from './environments/AdminDashboard.jsx'
import RaceManager from './ecosystems/RaceManager.jsx'
import WardFinderPage from './ecosystems/WardFinderPage.jsx'
import ResultsPage from './ecosystems/ResultsPage.jsx'
import SurveyPage from './ecosystems/SurveyPage.jsx'
import VoterCard from './environments/VoterCard.jsx'

class App extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Frame}>
          <IndexRoute component={WardFinderPage} />
          <Route path="survey" component={SurveyPage} />
          <Route path="results/:id" component={ResultsPage} />
          <Route path="votercard/:id" component={VoterCard} />
          <Route path="admin" component={AdminDashboard}/>
          <Route path="admin/races" component={RaceManager}/>
          <Route path="login" component={AdminLogin} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

export default App
