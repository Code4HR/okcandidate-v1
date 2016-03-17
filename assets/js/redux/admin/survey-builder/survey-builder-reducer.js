import makeError from './../../utils/makeError'

import {
  FETCH_ACTIVE_SURVEYS_REQUEST,
  FETCH_ACTIVE_SURVEYS_SUCCESS,
  FETCH_ACTIVE_SURVEYS_FAILURE,
  SELECT_ACTIVE_SURVEY_REQUEST,
  SELECT_ACTIVE_SURVEY_SUCCESS,
  SELECT_ACTIVE_SURVEY_FAILURE,
  TOGGLE_SURVEY_BUILDER_QUESTION_EDITABLE,
  UPDATE_SURVEY_BUILDER_QUESTION
} from './survey-builder-actions'

const initialState = {
  alerts: [],
  isFetching: false,
  activeSurveys: [],
  selectedSurvey: {},
  questions: []
}

export default function (state = initialState, action) {
  switch (action.type) {

    case FETCH_ACTIVE_SURVEYS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case FETCH_ACTIVE_SURVEYS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        activeSurveys: action.response
      })

    case FETCH_ACTIVE_SURVEYS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })

    case SELECT_ACTIVE_SURVEY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        selectedSurvey: action.survey
      })

    case SELECT_ACTIVE_SURVEY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        questions: [...action.response.questions]
      })

    case SELECT_ACTIVE_SURVEY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        alerts: [
          ...state.alerts,
          makeError('warning', 'There was an error setting the active survey')
        ]
      })

    case TOGGLE_SURVEY_BUILDER_QUESTION_EDITABLE:
      return Object.assign({}, state, {
        questions: state.questions.map(question => {
          if (question.id === action.id) {
            question.editable = !question.editable
          }
          return question
        })
      })

    case UPDATE_SURVEY_BUILDER_QUESTION:
      return Object.assign({}, state, {
        questions: state.questions.map(question => {
          if (question.id === action.question.id) {
            question = action.question
          }
          return question
        })
      })

    default:
      return state

  }
}
