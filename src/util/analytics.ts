import { v4 as uuid } from 'uuid'
import { Analytics } from "aws-amplify"
import mixpanel from 'mixpanel-browser'

export enum LucasDevEvents {
  PETS_VIEWED = 'page_view',
  HOME_VIEWED = 'page_view',
  NOT_FOUND_VIEWED = 'page_view',
  PET_PICTURE_CLICKED = 'pet_picture_clicked',
  TRAIL_BUTTON_CLICKED = 'trail_button_clicked',
  LANGUAGE_CHANGED = 'language_changed',
  LINKEDIN_BUTTON_CLICKED = 'linkedin_button_clicked',
  GITHUB_BUTTON_CLICKED = 'github_button_clicked',
  EMAIL_BUTTON_CLICKED = 'email_button_clicked',
  SOLIDJS_LINK_CLICKED = 'solidjs_link_clicked',
  GITHUB_CODE_LINK_CLICKED = 'github_code_link_clicked',
  CURRENT_COMPANY_LINK_CLICKED = 'current_company_link_clicked',
  LOCATION_LINK_CLICKED = 'location_link_clicked',
  PARKOUR_LINK_CLICKED = 'parkour_link_clicked',
}

// --- Amplify interfaces ---
export interface EventAttributes {
  [key: string]: string
}
export interface EventMetrics {
  [key: string]: number
}
// --------------------------

export const recordAnalyticsEvent = (eventName: LucasDevEvents, attributes: EventAttributes, metrics?: EventMetrics) => {
  const awsAmplifyEvent = recordAwsAmplifyEvent(eventName, attributes, metrics)
  const mixpanelEvent = recordMixpanelEvent(eventName, attributes, metrics)

  return Promise.all([awsAmplifyEvent, mixpanelEvent])
}

const recordAwsAmplifyEvent = (eventName: LucasDevEvents, attributes: EventAttributes, metrics?: EventMetrics) => Analytics.record({
  name: eventName,
  attributes,
  metrics,
})

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN
const APP_VERSION = import.meta.env.VITE_APP_VERSION
const recordMixpanelEvent = (eventName: LucasDevEvents, attributes: EventAttributes, metrics?: EventMetrics) => {
  const userUniqueId = getUserAnalyticsUniqueId()
  const now = new Date().valueOf()
  const mixpanelEventProperties = {
    LD_user_unique_id: userUniqueId,
    LD_current_timestamp: now,
    LD_app_version: APP_VERSION,
    token: MIXPANEL_TOKEN,
    ...attributes,
    ...metrics,
  }

  return mixpanel.track(eventName, mixpanelEventProperties)
}

let userAnalyticsUniqueId: string | undefined
const getUserAnalyticsUniqueId = () => {
  if (userAnalyticsUniqueId) return userAnalyticsUniqueId

  const localStorageKey = 'lucasdev-uid'
  const localStorageValue = localStorage.getItem(localStorageKey)

  if (localStorageValue) {
    userAnalyticsUniqueId = localStorageValue
    return userAnalyticsUniqueId
  }

  const newUniqueId = uuid()
  localStorage.setItem(localStorageKey, newUniqueId)
  userAnalyticsUniqueId = newUniqueId
  return userAnalyticsUniqueId
}
