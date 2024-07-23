import ReactGA from 'react-ga4'

/**
 * Triggers a custom Google Analytics event.
 * This sends an api request for google analytics
 *
 * @param {string} category - The category for the event.
 * @param {string} action - The action for the event. (action will show in the analytics dashboard)
 * @param {string} label - The label for the event.
 * @returns {void}
 */
export const triggerCustomGoogleAnalyticsEvent = (
  category: string, action: string, label: string, userData: { data: { email: string, username: string } }) => {
  const userName = extractNameFromEmail(userData?.data?.email)
  ReactGA.event({
    category,
    action: `BC - ${userName ?? ''} - ${action}`, // BC abbriviate for the "Button Click"
    label
  })
}

/**
 * Triggers a Google Analytics event as a page view.
 * This sends an api request for google analytics
 *
 * @param {string} page - The page for the event.
 * @param {string} title - The title for the page view
 * @returns {void}
 */
export const triggerGoogleAnalyticPageView = (
  page: string, title: string, userData: { data: { email: string, username: string } }) => {
  const userName = extractNameFromEmail(userData?.data?.email)
  // PV abbriviate for the "PageView"
  ReactGA.send({ hitType: 'pageview', page, title: `PV : ${userName ?? ''} - ${title}` })
}

/**
 * Retrieves the username from the email by extract the front part before '@'.
 *
 * @param {string} email - email address
 * @returns {string} extracted user name from the email.
 */
export const extractNameFromEmail = (email: string) => {
  const parts = email.split('@')

  if (parts.length !== 2) {
    return null
  }

  const name = parts[0]
  return name
}
