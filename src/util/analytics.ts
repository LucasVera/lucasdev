import { Analytics } from "aws-amplify"

export enum LucasDevEvents {
  PETS_VIEWED = 'pets_viewed',
  HOME_VIEWED = 'home_viewed',
  NOT_FOUND_VIEWED = 'not_found_viewed',
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
  return Analytics.record({
    name: eventName,
    attributes,
    metrics,
  })
}
