import {
  type AsyncStateObject,
  type Action
} from '../../../interfaces'
import { APP_ACTION_STATUS, USER_ACTIONS, COMMON_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: AsyncStateObject<{ userId: string, username: string, email: string }> = {
  data: {
    userId: '',
    username: '',
    email: ''
  },
  isLoading: false,
  status: APP_ACTION_STATUS.INITIAL
}

const storeUserReducer = (
  state = INITIAL_STATE,
  action: Action<{ userId: string, username: string, email: string }>
) => {
  switch (action.type) {
    case USER_ACTIONS.STORE_USER + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        status: APP_ACTION_STATUS.SUCCESS,
        data: action.data
      }
    default:
      return state
  }
}

export default storeUserReducer
