import { combineReducers } from 'redux'
import admin from './admin/admin-reducer.js'
import questionBuilder from './admin/question-builder/question-builder-reducer.js'

export default combineReducers({
  admin,
  questionBuilder
})
