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
  SELECT_SURVEY_QUESTION_RESPONSE,
  SELECT_SURVEY_QUESTION_RESPONSE_INTENSITY,
  FETCH_GEOGRAPHY_REQUEST,
  SUBMIT_STREET_ADDRESS_REQUEST,
  SUBMIT_STREET_ADDRESS_SUCCESS,
  SELECT_GEOGRAPHY,
  FETCH_GEOGRAPHY_SUCCESS,
  FETCH_GEOGRAPHY_FAILURE,
  SUBMIT_STREET_ADDRESS_FAILURE,
  FETCH_SURVEY_RESPONSE_ID_SUCCESS
} from './survey-actions'

const initialState = {
  surveyResponseId: null,
  ward: {
    address: { value: '', help: '' },
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

function makeSurveyAnswer(selectedSurveyId, questionId, answer, intensity) {
  return Object.assign({}, {
    surveyResponseId: selectedSurveyId,
    questionId: questionId,
    answerId: answer ? answer.id : undefined,
    intensity: intensity
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
          id: action.response.id,
          name: action.response.geographyName,
          address: state.ward.address
        })
      })

    case SELECT_GEOGRAPHY:
      return Object.assign({}, state, {
        ward: Object.assign({}, state.ward, {
          id: action.selection,
          name: state.ward.results.find(ward => {
            return ward.id === action.selection
          }).geographyName
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
          isFetching: false,
          address: Object.assign({}, state.ward.address, {
            help: 'There was an error.  Try another address?'
          })
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

    case SELECT_SURVEY_QUESTION_RESPONSE_INTENSITY:
    case SELECT_SURVEY_QUESTION_RESPONSE:

      // If the question has already been answered, find the previous response
      found = state.responses.find(response => {
        return response.questionId === action.questionId
      })

      // If response doesn't exist in responses, add it.
      if (!found) {
        return Object.assign({}, state, {
          responses: [
            ...state.responses,
            makeSurveyAnswer(
              state.selectedSurvey.id,
              action.questionId,
              action.answer,
              action.intensity
            )
          ]
        })
      }
      // Otherwise, modify it.
      else if (found) {
        return Object.assign({}, state, {
          responses: state.responses.map(response => {
            if (response.questionId === found.questionId) {
              if (action.type === SELECT_SURVEY_QUESTION_RESPONSE_INTENSITY) {
                response.intensity = action.intensity
              }
              else if (action.type === SELECT_SURVEY_QUESTION_RESPONSE) {
                response.answerId = action.answer.id
              }
            }
            return response
          })
        })
      }
      // otherwise just return state
      return state

    case FETCH_SURVEY_RESPONSE_ID_SUCCESS:
      return Object.assign({}, state, {
        surveyResponseId: action.response.id
      })

    default:
      return state

  }
}
