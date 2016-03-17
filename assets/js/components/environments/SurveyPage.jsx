import React, {Component, PropTypes} from 'react'

import SurveyQuestion from './../organisms/SurveyQuestion.jsx'


class SurveyPage extends Component {
  render() {
    return (
      <article>
        <h1>Survey Page</h1>
        <p>This is where the user will take a survey.</p>

        {data.questions.map((question)=><SurveyQuestion question={question}/>)}
      </article>
    )
  }
}

SurveyPage.propTypes = {
  survey: PropTypes.object
}

export default SurveyPage
