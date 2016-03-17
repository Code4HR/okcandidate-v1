import makeError from './../../utils/makeError'

import {
  SET_QUESTION_TEXT,
  ADD_ANSWER_FIELD,
  REMOVE_ANSWER_FIELD,
  SET_ANSWER_TEXT,
  SET_NEW_ANSWER_TEXT,
  SUBMIT_QUESTION,
  SUBMIT_QUESTION_REQUEST,
  SUBMIT_QUESTION_SUCCESS,
  SUBMIT_QUESTION_FAILURE
} from './question-builder-actions'

function makeAnswer(id, text) {
  return {
    text: text || '',
    id: id
  }
}

const initialState = {
  alerts: [],
  question: {
    value: '',
    help: ''
  },
  newAnswer: {
    value: '',
    help: ''
  },
  answers: [],
  isFetching: false
}

function validateNewAnswerText(text) {
  const errors = []
  if (text.length === 0) {
    errors.push(makeError('warning', 'This field shouldn\t be blank.'))
  }
  if (errors.length) {
    throw errors
  }
}

function validateQuestion(state) {
  const errors = []
  // It should have at least two answers
  if (state.answers.length < 2) {
    errors.push(makeError('warning', 'The question should have at least two answers'))
  }
  // The question text shouldn't be empty.
  if (!state.question.value.length) {
    errors.push(makeError('warning', 'The question field should not be blank'))
  }

  if (errors.length) {
    throw errors
  }
}

export default function(state = initialState, action) {

  switch (action.type) {

    case SET_QUESTION_TEXT:
      return Object.assign({}, state, {
        question: { value: action.text }
      })

    case ADD_ANSWER_FIELD:

      try {
        validateNewAnswerText(state.newAnswer.value)
        return Object.assign({}, state, {
          newAnswer: {},
          answers: [
            ...state.answers,
            makeAnswer(
              state.answers.length + 1,
              action.text
            )
          ]
        })
      }
      catch (error) {
        return Object.assign({}, state, {
          newAnswer: Object.assign({}, state.newAnswer, {
            help: 'This field shouldn\'t be blank'
          })
        })
      }

    case REMOVE_ANSWER_FIELD:
      return Object.assign({}, state, {
        answers: state.answers.filter(answer => {
          return answer.id !== action.id
        })
      })

    case SET_ANSWER_TEXT:
      return Object.assign({}, state, {
        answers: state.answers.map(answer => {
          if (answer.id === action.id) {
            answer.text = action.text
          }
        })
      })

    case SET_NEW_ANSWER_TEXT:
      return Object.assign({}, state, {
        newAnswer: {
          value: action.text
        }
      })

    case SUBMIT_QUESTION:
      try {
        validateQuestion(state)
        return Object.assign({}, state, {
          alerts: []
        })
      }
      catch (error) {
        return Object.assign({}, state, {
          alerts: [...error]
        })
      }

    case SUBMIT_QUESTION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case SUBMIT_QUESTION_SUCCESS:
    case SUBMIT_QUESTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })

    default:
      return state
  }

}
