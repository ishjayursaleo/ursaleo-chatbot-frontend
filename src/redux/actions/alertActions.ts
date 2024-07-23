import { type Action, type AlertMessage } from '../../interfaces'
import { ALERT_ACTIONS } from '../../utils/constants'

const triggerAlert = (data: AlertMessage): Action<AlertMessage> => {
  return { type: ALERT_ACTIONS.TRIGGER_ALERT_MESSAGE, data }
}

const removeAlert = (data: AlertMessage): Action<AlertMessage> => {
  return { type: ALERT_ACTIONS.REMOVE_ALERT_MESSAGE, data }
}

export const alertActions = {
  triggerAlert,
  removeAlert
}
