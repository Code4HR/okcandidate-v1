export const SET_QUESTION_TEXT = 'SET_QUESTION_TEXT'
export const SET_ANSWER_TEXT = 'SET_ANSWER'
export const SET_NEW_ANSWER_TEXT = 'SET_NEW_ANSWER_TEXT'
export const ADD_ANSWER_FIELD = 'ADD_ANSWER_FIELD'
export const REMOVE_ANSWER_FIELD = 'REMOVE_ANSWER_FIELD'

export const SUBMIT_QUESTION = 'SUBMIT_QUESTION'
export const SUBMIT_QUESTION_REQUEST = 'SUBMIT_QUESTION_REQUEST'
export const SUBMIT_QUESTION_SUCCESS = 'SUBMIT_QUESTION_SUCCESS'
export const SUBMIT_QUESTION_FAILURE = 'SUMIT_QUESTION_FAILURE'

export function setQuestionText(text) {
  return {
    type: SET_QUESTION_TEXT,
    text
  }
}

export function addAnswerField(text) {
  return {
    type: ADD_ANSWER_FIELD,
    text
  }
}

export function removeAnswerField(id) {
  return {
    type: REMOVE_ANSWER_FIELD,
    id
  }
}

export function setAnswerText(id, text) {
  return {
    type: SET_ANSWER_TEXT,
    text
  }
}

export function setNewAnswerText(text) {
  return {
    type: SET_NEW_ANSWER_TEXT,
    text
  }
}

export function submitQuestion() {
  return {
    type: SUBMIT_QUESTION
  }
}
