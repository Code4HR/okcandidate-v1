import React, { Component, PropTypes } from 'react'

import {
  Input,
  Well,
  Button
} from 'react-bootstrap'

class SurveyQuestion extends Component {

  render() {
    return (
      <section>
        {
          <Well>
            <label>{this.props.question.questionText}
                {
                  this.props.question.answers.map(answer => {
                    return (<div>
                      <input type='radio'>
                        <span className="checkbox-label">{answer.answerLabel}</span>
                      </input>
                    </div>
                    )
                  })
                }
            </label>
          </Well>
        }
      </section>
    )
  }
}

SurveyQuestion.propTypes = {
  id: PropTypes.id,
  question: PropTypes.object
}

export default SurveyQuestion
