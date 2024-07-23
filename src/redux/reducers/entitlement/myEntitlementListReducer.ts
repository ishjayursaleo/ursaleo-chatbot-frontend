/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type Action, type AsyncStateObject } from '../../../interfaces'
import { type MyEntitlementListResponse } from '../../../interfaces/entitlements'
import { APP_ACTION_STATUS, COMMON_ACTIONS, ENTITLEMENT_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: AsyncStateObject<MyEntitlementListResponse | null> = {
  data: null,
  isLoading: false,
  status: APP_ACTION_STATUS.INITIAL,
  error: undefined
}

const myEntitlementListReducer = (
  state = INITIAL_STATE,
  action: Action<MyEntitlementListResponse>
): AsyncStateObject<MyEntitlementListResponse | null> => {
  switch (action.type) {
    case ENTITLEMENT_ACTIONS.GET_MY_ENTITLEMENT + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.LOADING,
        error: undefined
      }
    case ENTITLEMENT_ACTIONS.GET_MY_ENTITLEMENT + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: APP_ACTION_STATUS.SUCCESS,
        data: action.data
      }
    case ENTITLEMENT_ACTIONS.GET_MY_ENTITLEMENT + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        status: APP_ACTION_STATUS.ERROR,
        error: action.error
      }
    case ENTITLEMENT_ACTIONS.GET_MY_ENTITLEMENT + COMMON_ACTIONS.CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}

export default myEntitlementListReducer
