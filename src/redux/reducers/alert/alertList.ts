import { type AlertMessage, type Action } from '../../../interfaces'
import {
  ALERT_ACTIONS
} from '../../../utils/constants'

const INITIAL_STATE: AlertMessage[] = []

const alertListReducer = (state = INITIAL_STATE, action: Action<AlertMessage>) => {
  switch (action.type) {
    case ALERT_ACTIONS.TRIGGER_ALERT_MESSAGE:{
      const message: AlertMessage = {
        message: action.data.message,
        options: {
          variant: action.data.options?.variant,
          anchorOrigin: {
            horizontal: action.data.options?.anchorOrigin?.horizontal,
            vertical: action.data.options?.anchorOrigin?.vertical
          },
          persist: action.data.options?.persist,
          autoHideDuration: action.data.options?.autoHideDuration
        }
      }
      const newState = [...state]
      newState.push(message)
      return newState
    }
    case ALERT_ACTIONS.REMOVE_ALERT_MESSAGE: {
      const newState = state.filter(m => m.options?.key !== action.data.options?.key)
      return newState
    }
    default:
      return state
  }
}

export default alertListReducer
