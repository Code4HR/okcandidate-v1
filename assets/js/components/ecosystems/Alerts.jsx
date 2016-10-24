import React, { PropTypes, Component } from 'react'

import {
 Alert,
 Button
} from 'react-bootstrap'

const style = {
  message: {
    marginBottom: '.5em'
  }
}

import {
  removeGlobalAlert
} from './../../redux/survey/survey-actions'

class Alerts extends Component {

  dismissAlert(id) {
    this.props.dispatch(removeGlobalAlert(id))
  }

  render() {
    return (
      <section>
        {
          this.props.alerts.map((alert, index) => {
            return (
              <Alert
                key={index}
                bsStyle={alert.severity}
                onDismiss={this.dismissAlert.bind(this, alert.id)}>
                  <div style={style.message}>
                    {alert.text}
                  </div>
                  <Button
                    onClick={this.dismissAlert.bind(this, alert.id)}
                    bsStyle={alert.severity}>OK</Button>
              </Alert>
            )
          })
        }
      </section>
    )
  }

}

Alerts.propTypes = {
  alerts: PropTypes.array,
  dispatch: PropTypes.func
}

export default Alerts
