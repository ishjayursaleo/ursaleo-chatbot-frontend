/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {
  type ClientCreateResponsePayload,
  type AsyncStateObject,
  type Action,
  type UserCreateResponsePayload,
  type GetClientAdminListResponsePayload
} from '../../../interfaces'
import { APP_ACTION_STATUS, USER_ACTIONS, COMMON_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: AsyncStateObject<GetClientAdminListResponsePayload[]> = {
  data: [],
  isLoading: false,
  status: APP_ACTION_STATUS.INITIAL,
  error: undefined
}

const getClientAdminListReducer = (state = INITIAL_STATE, action: Action<GetClientAdminListResponsePayload>) => {
  switch (action.type) {
    case USER_ACTIONS.GET_CLIENT_ADMIN_LIST + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.LOADING,
        error: undefined
      }
    case USER_ACTIONS.GET_CLIENT_ADMIN_LIST + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.SUCCESS,
        data: action.data
      }
    case USER_ACTIONS.GET_CLIENT_ADMIN_LIST + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.ERROR,
        error: action.error
      }
    case USER_ACTIONS.GET_CLIENT_ADMIN_LIST + COMMON_ACTIONS.CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}

export default getClientAdminListReducer
