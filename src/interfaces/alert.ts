import {
  type ALERT_ORIGIN_HORIZONTAL_TYPE,
  type ALERT_ORIGIN_VERTICAL_TYPE,
  type ALERT_VARIANT
} from '../utils/constants'

export interface AlertMessage {
  message: string
  options?: {
    key?: number
    preventDuplicate?: boolean
    variant?: ALERT_VARIANT
    persist?: boolean
    autoHideDuration?: number
    anchorOrigin?: {
      vertical?: ALERT_ORIGIN_VERTICAL_TYPE
      horizontal?: ALERT_ORIGIN_HORIZONTAL_TYPE
    }
  }
}

export interface AlertState {
  alertList: AlertMessage[]
}
