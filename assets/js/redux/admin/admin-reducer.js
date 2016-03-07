import {
  SET_ADMIN_DASHBOARD_MOOD
} from './admin-actions'

const initialState = {
  mood: 'magnificent.'
}

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_ADMIN_DASHBOARD_MOOD:
      return Object.assign({}, {
        mood: action.mood
      })

    default:
      return state
  }
}
