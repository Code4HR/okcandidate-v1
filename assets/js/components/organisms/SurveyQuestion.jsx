import React, { Component, PropTypes } from 'react'

import {
  Well
} from 'react-bootstrap'

class SurveyQuestion extends Component {

  render() {
    return (
      <section>
        {
          <Well>
            <label>{this.props.question.questionText}
                 <radio-group>{
                  this.props.question.answers.map(answer => {
                    return (<div>
                      <radio-button>
                        <input type="radio" className="checkbox-label" >{answer.answerLabel}</input>
                      </radio-button>
                    </div>
                    )
                  })
                }
                </radio-group>
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
