import fetch from 'isomorphic-fetch'
import checkStatus from './../utils/checkStatus'
import { browserHistory } from 'react-router'
import validator from 'validator'

export const FETCH_ACTIVE_SURVEYS_REQUEST = 'FETCH_ACTIVE_SURVEYS_REQUEST'
export const FETCH_ACTIVE_SURVEYS_SUCCESS = 'FETCH_ACTIVE_SURVEYS_SUCCESS'
export const FETCH_ACTIVE_SURVEYS_FAILURE = 'FETCH_ACTIVE_SURVEYS_FAILURE'

export function fetchActiveSurveysRequest() {
  return {
    type: FETCH_ACTIVE_SURVEYS_REQUEST
  }
}

export function fetchActiveSurveysSuccess(response) {
  return {
    type: FETCH_ACTIVE_SURVEYS_SUCCESS,
    response
  }
}

export function fetchActiveSurveysFailure(error) {
  return {
    type: FETCH_ACTIVE_SURVEYS_FAILURE,
    error
  }
}

export function fetchActiveSurveys() {
  return function(dispatch) {
    dispatch(fetchActiveSurveysRequest())
    return fetch('/api/survey')
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch(fetchActiveSurveysSuccess(response))
      // If only one survey comes back, go ahead and make the follow up API
      // to set it as active.
      if (response.length === 1) {
        dispatch(selectActiveSurvey(response[0]))
      }
    })
    .catch(error => dispatch(fetchActiveSurveysFailure(error)))
  }
}

export const SELECT_ACTIVE_SURVEY = 'SELECT_ACTIVE_SURVEY'
export const SELECT_ACTIVE_SURVEY_REQUEST = 'SELECT_ACTIVE_SURVEY_REQUEST'
export const SELECT_ACTIVE_SURVEY_SUCCESS = 'SELECT_ACTIVE_SURVEY_SUCCESS'
export const SELECT_ACTIVE_SURVEY_FAILURE = 'SELECT_ACTIVE_SURVEY_FAILURE'

export function selectActiveSurvey(survey) {
  return function(dispatch) {
    dispatch({
      type: SELECT_ACTIVE_SURVEY_REQUEST,
      survey
    })
    return fetch(`/api/survey/${survey.id}`)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch(selectActiveSurveySuccess(response))
    })
    .catch(error => dispatch(selectActiveSurveyFailure(error)))
  }

}

export function selectActiveSurveyRequest() {
  return {
    type: SELECT_ACTIVE_SURVEY_REQUEST
  }
}

export function selectActiveSurveySuccess(response) {
  return {
    type: SELECT_ACTIVE_SURVEY_SUCCESS,
    response
  }
}

export function selectActiveSurveyFailure(error) {
  return {
    type: SELECT_ACTIVE_SURVEY_FAILURE,
    error
  }
}

export const TOGGLE_SURVEY_BUILDER_QUESTION_EDITABLE =
  'TOGGLE_SURVEY_BUILDER_QUESTION_EDITABLE'

export function toggleSurveyBuilderQuestionEditable(id) {
  return {
    type: TOGGLE_SURVEY_BUILDER_QUESTION_EDITABLE,
    id
  }
}

export const UPDATE_SURVEY_BUILDER_QUESTION = 'UPDATE_SURVEY_BUILDER_QUESTION'

export function updateSurveyBuilderQuestion(question) {
  return {
    type: UPDATE_SURVEY_BUILDER_QUESTION,
    question
  }
}

export const SELECT_SURVEY_QUESTION_RESPONSE = 'SELECT_SURVEY_QUESTION_RESPONSE'
export const SELECT_SURVEY_QUESTION_RESPONSE_INTENSITY =
  'SELECT_SURVEY_QUESTION_RESPONSE_INTENSITY'
export const REMOVE_SURVEY_QUESTION_RESPONSE_AND_INTENSITY =
  'REMOVE_SURVEY_QUESTION_RESPONSE_AND_INTENSITY'
export const INCREMENT_SURVEY_QUESTION_INDEX =
  'INCREMENT_SURVEY_QUESTION_INDEX'
export const DECREMENT_SURVEY_QUESTION_INDEX =
  'DECREMENT_SURVEY_QUESTION_INDEX'

export function selectSurveyQuestionResponse(questionId, answer) {
  return {
    type: SELECT_SURVEY_QUESTION_RESPONSE,
    questionId,
    answer
  }
}

export function selectSurveyQuestionResponseIntensity(questionId, intensity) {
  return {
    type: SELECT_SURVEY_QUESTION_RESPONSE_INTENSITY,
    questionId,
    intensity
  }
}

export function removeSurveyQuestionResponseAndIntensity(questionId) {
  return {
    type: REMOVE_SURVEY_QUESTION_RESPONSE_AND_INTENSITY,
    questionId
  }
}

export function incrementSurveyQuestionIndex() {
  return {
    type: INCREMENT_SURVEY_QUESTION_INDEX
  }
}

export function decrementSurveyQuestionIndex() {
  return {
    type: DECREMENT_SURVEY_QUESTION_INDEX
  }
}

export const SUBMIT_SURVEY_ANSWERS = 'SUBMIT_SURVEY_ANSWERS'
export const SUBMIT_SURVEY_ANSWERS_REQUEST = 'SUBMIT_SURVEY_ANSWERS_REQUEST'
export const SUBMIT_SURVEY_ANSWERS_SUCCESS = 'SUBMIT_SURVEY_ANSWERS_SUCCESS'
export const SUBMIT_SURVEY_ANSWERS_FAILURE = 'SUBMIT_SURVEY_ANSWERS_FAILURE'

export function submitSurveyAnswersRequest() {
  return {
    type: SUBMIT_SURVEY_ANSWERS_REQUEST
  }
}

export function submitSurveyAnswersSuccess(response) {
  return {
    type: SUBMIT_SURVEY_ANSWERS_SUCCESS,
    response
  }
}

export function submitSurveyAnswersFailure(error) {
  return {
    type: SUBMIT_SURVEY_ANSWERS_FAILURE,
    error
  }
}

export function submitSurveyAnswers(responses) {
  return function(dispatch) {
    dispatch(submitSurveyAnswersRequest())
    return fetch('/api/survey_answer', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        responses: responses
      })
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch(submitSurveyAnswersSuccess(response))
      browserHistory.push(`/results/${response[0].survey_response_id}`)
    })
    .catch(error => {
      dispatch(submitSurveyAnswersFailure(error))
    })
  }
}

export const TOGGLE_WARDFINDER_WARD_DROPDOWN = 'TOGGLE_WARDFINDER_WARD_DROPDOWN'

export function toggleWardfinderWardDropdown() {
  return {
    type: TOGGLE_WARDFINDER_WARD_DROPDOWN
  }
}

export const SET_STREET_ADDRESS = 'SET_STREET_ADDRESS'
export const SET_STREET_ADDRESS_ERROR = 'SET_STREET_ADDRESS_ERROR'

export function setStreetAddress(street) {
  return {
    type: SET_STREET_ADDRESS,
    street
  }
}

export const SUBMIT_STREET_ADDRESS_REQUEST = 'SUBMIT_STREET_ADDRESS_REQUEST'
export const SUBMIT_STREET_ADDRESS_SUCCESS = 'SUBMIT_STREET_ADDRESS_SUCCESS'
export const SUBMIT_STREET_ADDRESS_FAILURE = 'SUBMIT_STREET_ADDRESS_FAILURE'

export function submitStreetAddressRequest() {
  return {
    type: SUBMIT_STREET_ADDRESS_REQUEST
  }
}

export function submitStreetAddressSuccess(response) {
  return {
    type: SUBMIT_STREET_ADDRESS_SUCCESS,
    response
  }
}

export function submitStreetAddressFailure(error) {
  return {
    type: SUBMIT_STREET_ADDRESS_FAILURE,
    error
  }
}

export function submitStreetAddress(street) {
  return function(dispatch) {
    dispatch(submitStreetAddressRequest(street))

    if (!street) {
      dispatch(setStreetAddress({
        help: 'This field shouldn\'t be blank'
      }))
      return
    }

    if (street.length < 3) {
      dispatch(setStreetAddress({
        help: 'Please enter a longer address'
      }))
      return
    }

    return fetch('/api/geography/ward', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        street: street
      })
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch(submitStreetAddressSuccess(response))
      dispatch(selectGeography(response.id))
    })
    .catch(error => {
      dispatch(submitStreetAddressFailure(error))
    })
  }
}

export function submitNeighborhood(neighborhood) {
  return dispatch => {
    dispatch(fetchSurveyResponseId(1, 1, neighborhood))
  }
}

export const FETCH_GEOGRAPHY_REQUEST = 'FETCH_GEOGRAPHY_REQUEST'
export const FETCH_GEOGRAPHY_SUCCESS = 'FETCH_GEOGRAPHY_SUCCESS'
export const FETCH_GEOGRAPHY_FAILURE = 'FETCH_GEOGRAPHY_FAILURE'

export function fetchGeographyRequest() {
  return {
    type: FETCH_GEOGRAPHY_REQUEST
  }
}

export function fetchGeographySuccess(response) {
  return {
    type: FETCH_GEOGRAPHY_SUCCESS,
    response
  }
}

export function fetchGeographyFailure(error) {
  return {
    type: FETCH_GEOGRAPHY_FAILURE,
    error
  }
}

export function fetchGeography() {
  return function(dispatch) {
    dispatch(fetchGeographyRequest())
    return fetch('/api/geography')
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch(fetchGeographySuccess(response))
    })
    .catch(error => {
      dispatch(fetchGeographyFailure(error))
    })
  }
}

export const SELECT_GEOGRAPHY = 'SELECT_GEOGRAPHY'

export function selectGeography(geographyId) {
  return function(dispatch) {
    dispatch({
      type: SELECT_GEOGRAPHY,
      selection: geographyId
    })
    // Todo: surveyID needs to come from somewhere.
    dispatch(fetchSurveyResponseId(1, geographyId))
  }
}

export const FETCH_SURVEY_RESPONSE_ID_REQUEST = 'FETCH_SURVEY_RESPONSE_ID_REQUEST'
export const FETCH_SURVEY_RESPONSE_ID_SUCCESS = 'FETCH_SURVEY_RESPONSE_ID_SUCCESS'
export const FETCH_SURVEY_RESPONSE_ID_FAILURE = 'FETCH_SURVEY_RESPONSE_ID_FAILURE'

export function fetchSurveyResponseIdRequest() {
  return {
    type: FETCH_SURVEY_RESPONSE_ID_REQUEST
  }
}

export function fetchSurveyResponseIdSuccess(response) {
  return {
    type: FETCH_SURVEY_RESPONSE_ID_SUCCESS,
    response
  }
}

export function fetchSurveyResponseIdFailure(error) {
  return {
    type: FETCH_SURVEY_RESPONSE_ID_FAILURE,
    error
  }
}

export function fetchSurveyResponseId(surveyId, geographyId, neighborhood) {
  return function(dispatch) {
    dispatch(fetchSurveyResponseIdRequest())
    return fetch('/api/survey_response', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        surveyId: surveyId,
        geographyId: geographyId,
        neighborhood: neighborhood
      })
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch(fetchSurveyResponseIdSuccess(response))
      browserHistory.push('/survey')
    })
    .catch(error => {
      dispatch(fetchSurveyResponseIdFailure(error))
    })
  }
}

export const FETCH_SURVEY_CANDIDATE_MATCHES_REQUEST = 'FETCH_SURVEY_CANDIDATE_MATCHES_REQUEST'
export const FETCH_SURVEY_CANDIDATE_MATCHES_SUCCESS = 'FETCH_SURVEY_CANDIDATE_MATCHES_SUCCESS'
export const FETCH_SURVEY_CANDIDATE_MATCHES_FAILURE = 'FETCH_SURVEY_CANDIDATE_MATCHES_FAILURE'

export function fetchSurveyCandidateMatchesRequest() {
  return {
    type: FETCH_SURVEY_CANDIDATE_MATCHES_REQUEST
  }
}

export function fetchSurveyCandidateMatchesSuccess(response) {
  return {
    type: FETCH_SURVEY_CANDIDATE_MATCHES_SUCCESS,
    response
  }
}

export function fetchSurveyCandidateMatchesFailure(error) {
  return {
    type: FETCH_SURVEY_CANDIDATE_MATCHES_FAILURE,
    error
  }
}

export function fetchSurveyCandidateMatches(id) {
  return function(dispatch) {
    dispatch(fetchSurveyCandidateMatchesRequest())
    fetch(`/api/candidate_match/${id}`)
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch(fetchSurveyCandidateMatchesSuccess(response))
    })
    .catch(error => {
      dispatch(fetchSurveyCandidateMatchesFailure(error))
    })
  }
}

export const HIDE_ELECTION_DAY_REMINDER_PROMPT =
  'HIDE_ELECTION_DAY_REMINDER_PROMPT'
export const SHOW_ELECTION_DAY_REMINDER_MODAL =
  'SHOW_ELECTION_DAY_REMINDER_MODAL'
export const HIDE_ELECTION_DAY_REMINDER_MODAL =
  'HIDE_ELECTION_DAY_REMINDER_MODAL'

export const SET_ELECTION_DAY_REMINDER_EMAIL_ADDRESS =
  'SET_ELECTION_DAY_REMINDER_EMAIL_ADDRESS'
export const SET_ELECTION_DAY_REMINDER_TELEPHONE_NUMBER =
  'SET_ELECTION_DAY_REMINDER_TELEPHONE_NUMBER'

export const SUBMIT_ELECTION_DAY_REMINDER_REQUEST = 'SUBMIT_ELECTION_DAY_REMINDER_REQUEST'
export const SUBMIT_ELECTION_DAY_REMINDER_SUCCESS = 'SUBMIT_ELECTION_DAY_REMINDER_SUCCESS'
export const SUBMIT_ELECTION_DAY_REMINDER_FAILURE = 'SUBMIT_ELECTION_DAY_REMINDER_FAILURE'

export function hideElectionDayReminderPrompt () {
  return {
    type: HIDE_ELECTION_DAY_REMINDER_PROMPT
  }
}

export function showElectionDayReminderModal() {
  return {
    type: SHOW_ELECTION_DAY_REMINDER_MODAL
  }
}

export function hideElectionDayReminderModal() {
  return {
    type: HIDE_ELECTION_DAY_REMINDER_MODAL
  }
}

export function setElectionDayReminderEmailAddress(value, error = '') {
  return {
    type: SET_ELECTION_DAY_REMINDER_EMAIL_ADDRESS,
    value,
    error
  }
}

export function setElectionDayReminderTelephoneNumber(value, error = '') {
  return {
    type: SET_ELECTION_DAY_REMINDER_TELEPHONE_NUMBER,
    value,
    error
  }
}

export function submitElectionDayReminderRequest() {
  return {
    type: SUBMIT_ELECTION_DAY_REMINDER_REQUEST
  }
}

export function submitElectionDayReminderSuccess(response) {
  return {
    type: SUBMIT_ELECTION_DAY_REMINDER_SUCCESS,
    response
  }
}

export function submitElectionDayReminderFailure(error) {
  return {
    type: SUBMIT_ELECTION_DAY_REMINDER_FAILURE,
    error
  }
}

export function validateElectionDayReminderRequest(email, telephone) {

  const errors = {}
  if (telephone) {
    telephone = telephone.replace(/[^\d]/g, '')
  }

  function validateEmailAddress() {
    if (!validator.isEmail(email)) {
      errors.email = {
        value: email,
        error: 'Please enter a valid email address (like person@provider.com).'
      }
    }
  }

  function validateTelephoneNumber() {
    if (!validator.isMobilePhone(telephone, 'en-US')) {
      errors.telephone = {
        value: telephone,
        error: 'Please enter a 10-digit phone number (like 555-555-5555).'
      }
    }
  }

  // If an email address was provided:
  if (email) {
    validateEmailAddress()
  }

  // If a telephone number was provided:
  if (telephone) {
    validateTelephoneNumber()
  }

  // Nothing is defined.
  if (!email && !telephone) {
    errors.alert = {
      message: 'At least one piece of contact information should be provided',
      severity: 'warning'
    }
  }

  // If errors were found, return the error object.  If not, return undefined.
  const numberOfErrors = Object.keys(errors).length

  if (numberOfErrors > 0) {

    // If a specific alert hasn't been defined already...
    if (!errors.alert) {
      errors.alert = {
        message: `Please correct the ${numberOfErrors > 1 ? 'errors' : 'error'} below`,
        severity: 'warning'
      }
    }

    return errors

  }

}

export function submitElectionDayReminder(email, telephone, surveyId) {
  return function(dispatch) {

    dispatch(submitElectionDayReminderRequest())
    const errors = validateElectionDayReminderRequest(email.value, telephone.value)
    if (errors) {
      return dispatch(submitElectionDayReminderFailure(errors))
    }
    fetch(`/api/survey_response/contact_info/${surveyId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: email.value,
        userPhone: telephone.value
      })
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
      dispatch(submitElectionDayReminderSuccess(response))
    })
    .catch(() => {
      dispatch(submitElectionDayReminderFailure({
        alert: {
          message: 'There was an error saving your contact information',
          severity: 'danger'
        }
      }))
    })

  }
}

export const ADD_GLOBAL_ALERT = 'ADD_GLOBAL_ALERT'
export const REMOVE_GLOBAL_ALERT = 'REMOVE_GLOBAL_ALERT'

export function addGlobalAlert(severity, text) {
  return {
    type: ADD_GLOBAL_ALERT,
    severity,
    text
  }
}

export function removeGlobalAlert(id) {
  return {
    type: REMOVE_GLOBAL_ALERT,
    id
  }
}
