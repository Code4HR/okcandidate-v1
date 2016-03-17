import {
  SET_ADMIN_DASHBOARD_MOOD
} from './admin-actions'

import { createSelector } from 'reselect'

const initialState = {
  mood: 'magnificent.'
}

export const adminSelector = createSelector(
  [
    state => state.surveyBuilder,
    state => state.questionBuilder
  ],
  (state = initialState, action) => {
    switch (action.type) {

      case SET_ADMIN_DASHBOARD_MOOD:
        return Object.assign({}, {
          mood: action.mood
        })

      default:
        return state
    }
})
