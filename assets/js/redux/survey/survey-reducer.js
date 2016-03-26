import makeError from './../utils/makeError'

import {
  FETCH_ACTIVE_SURVEYS_REQUEST,
  FETCH_ACTIVE_SURVEYS_SUCCESS,
  FETCH_ACTIVE_SURVEYS_FAILURE,
  SELECT_ACTIVE_SURVEY_REQUEST,
  SELECT_ACTIVE_SURVEY_SUCCESS,
  SELECT_ACTIVE_SURVEY_FAILURE,
  TOGGLE_SURVEY_BUILDER_QUESTION_EDITABLE,
  UPDATE_SURVEY_BUILDER_QUESTION,
  SELECT_SURVEY_QUESTION_RESPONSE
} from './survey-actions'

const initialState = {
  ward: {
    id: null,
    results: []
  },
  alerts: [],
  isFetching: false,
  activeSurveys: [],
  selectedSurvey: {},
  questions: [],
  responses: []
}

function makeSurveyAnswer(selectedSurveyId, questionId, answer) {
  return Object.assign({}, {
    survey_response_id: selectedSurveyId,
    question_id: questionId,
    answer_id: answer.id,
    score: answer.answerValue
  })
}

export default function (state = initialState, action) {

  let found

  switch (action.type) {

    case FETCH_GEOGRAPHY_REQUEST:
    case SUBMIT_STREET_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        ward: Object.assign({}, state.ward, {
          isFetching: true
        })
      })

    case SUBMIT_STREET_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        ward: Object.assign({}, state.ward, {
          isFetching: false,
          id: action.response.ward
        })
      })

    case SELECT_GEOGRAPHY:
      return Object.assign({}, state, {
        ward: Object.assign({}, state.ward, {
          id: action.selection
        })
      })

    case FETCH_GEOGRAPHY_SUCCESS:
      return Object.assign({}, state, {
        ward: Object.assign({}, state.ward, {
          isFetching: false,
          results: action.response
        })
      })

    case FETCH_GEOGRAPHY_FAILURE:
    case SUBMIT_STREET_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        ward: Object.assign({}, state.ward, {
          isFetching: false
        })
      })


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
            question = Object.assign({}, question, {
              editable: false,
              questionText: action.question.questionText.value,
              answers: action.question.answers
            })
          }
          return question
        })
      })

    case SELECT_SURVEY_QUESTION_RESPONSE:

      // If the question has already been answered, find the previous response
      found = state.responses.find(response => {
        return response.question_id === action.questionId
      })

      // If response doesn't exist in responses, add it.
      if (!found) {
        return Object.assign({}, state, {
          responses: [
            ...state.responses,
            makeSurveyAnswer(
              state.selectedSurvey.id,
              action.questionId,
              action.answer
            )
          ]
        })
      }
      // Otherwise, modify it.
      else if (found) {
        return Object.assign({}, state, {
          responses: state.responses.map(response => {
            if (response.question_id === found.question_id) {
              response = makeSurveyAnswer(
                state.selectedSurvey.id,
                action.questionId,
                action.answer
              )
            }
            return response
          })
        })
      }
      // otherwise just return state
      return state

    default:
      return state

  }
}
