/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type Action, type AsyncStateObject } from '../../../interfaces'
import { type EntitlementBulkResponse } from '../../../interfaces/entitlements'
import { APP_ACTION_STATUS, COMMON_ACTIONS, ENTITLEMENT_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: AsyncStateObject<EntitlementBulkResponse | null> = {
  data: null,
  isLoading: false,
  status: APP_ACTION_STATUS.INITIAL,
  error: undefined
}

const addEntitlementBulkReducer = (
  state = INITIAL_STATE,
  action: Action<EntitlementBulkResponse>
): AsyncStateObject<EntitlementBulkResponse | null> => {
  switch (action.type) {
    case ENTITLEMENT_ACTIONS.ADD__ENTITLEMENT_BULK + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.LOADING,
        error: undefined
      }
    case ENTITLEMENT_ACTIONS.ADD__ENTITLEMENT_BULK + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: APP_ACTION_STATUS.SUCCESS,
        data: action.data
      }
    case ENTITLEMENT_ACTIONS.ADD__ENTITLEMENT_BULK + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        status: APP_ACTION_STATUS.ERROR,
        error: action.error
      }
    case ENTITLEMENT_ACTIONS.ADD__ENTITLEMENT_BULK + COMMON_ACTIONS.CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}

export default addEntitlementBulkReducer
