import React, { PropTypes, Component } from 'react'

import ElectionDayReminderPrompt from './../organisms/ElectionDayReminderPrompt.jsx'
import ElectionDayReminderModal from './../ecosystems/ElectionDayReminderModal.jsx'

class ElectionDayReminder extends Component {

  render() {
    return (
      <section>

        { this.props.electionDayReminder.displayPrompt &&
          <ElectionDayReminderPrompt
            electionDayReminder={this.props.electionDayReminder}
            dispatch={this.props.dispatch} />
        }

        <ElectionDayReminderModal
          electionDayReminder={this.props.electionDayReminder}
          surveyId={this.props.surveyId}
          dispatch={this.props.dispatch} />

      </section>
    )
  }

}

ElectionDayReminder.propTypes = {
  electionDayReminder: PropTypes.object,
  surveyId: PropTypes.number,
  dispatch: PropTypes.func
}

export default ElectionDayReminder
