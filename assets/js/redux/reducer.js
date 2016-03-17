import { combineReducers } from 'redux'
import admin from './admin/admin-reducer.js'
import questionBuilder from './admin/question-builder/question-builder-reducer'
import surveyBuilder from './admin/survey-builder/survey-builder-reducer'

export default combineReducers({
  admin,
  questionBuilder,
  surveyBuilder
})
