export const SET_ADMIN_DASHBOARD_MOOD = 'SET_ADMIN_DASHBOARD_MOOD'

export function setAdminDashboardMood(mood) {
  return  {
    type: SET_ADMIN_DASHBOARD_MOOD,
    mood
  }
}
