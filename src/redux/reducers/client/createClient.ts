/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type ClientCreateResponsePayload, type AsyncStateObject, type Action } from '../../../interfaces'
import { APP_ACTION_STATUS, CLIENT_ACTIONS, COMMON_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: AsyncStateObject<ClientCreateResponsePayload> = {
  data: { id: '', name: '', description: '', createdAt: '', updatedAt: '' },
  isLoading: false,
  status: APP_ACTION_STATUS.INITIAL,
  error: undefined
}

const createClientReducer = (state = INITIAL_STATE, action: Action<ClientCreateResponsePayload>) => {
  switch (action.type) {
    case CLIENT_ACTIONS.CREATE_CLIENT + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.LOADING,
        error: undefined
      }
    case CLIENT_ACTIONS.CREATE_CLIENT + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.SUCCESS,
        data: action.data
      }
    case CLIENT_ACTIONS.CREATE_CLIENT + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.ERROR,
        error: action.error
      }
    case CLIENT_ACTIONS.CREATE_CLIENT + COMMON_ACTIONS.CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}

export default createClientReducer
