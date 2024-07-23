/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type AsyncStateObject, type Action, type ClientDetailsResponse } from '../../../interfaces'
import { APP_ACTION_STATUS, CLIENT_ACTIONS, COMMON_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: AsyncStateObject<ClientDetailsResponse> = {
  data: {
    data: [],
    count: 0
  },
  isLoading: false,
  status: APP_ACTION_STATUS.INITIAL,
  error: undefined
}

const selectedClientDetailsReducer = (state = INITIAL_STATE, action: Action<ClientDetailsResponse>) => {
  switch (action.type) {
    case CLIENT_ACTIONS.GET_SELECTED_CLIENT_DETAILS + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.LOADING,
        error: undefined
      }
    case CLIENT_ACTIONS.GET_SELECTED_CLIENT_DETAILS + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.SUCCESS,
        data: action.data
      }
    case CLIENT_ACTIONS.GET_SELECTED_CLIENT_DETAILS + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.ERROR,
        error: action.error
      }
    case CLIENT_ACTIONS.GET_SELECTED_CLIENT_DETAILS + COMMON_ACTIONS.CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}

export default selectedClientDetailsReducer
