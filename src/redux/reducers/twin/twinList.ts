/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type AsyncStateObject, type Action } from '../../../interfaces'
import { type GetAllTwinListResponse } from '../../../interfaces/twins'
import { APP_ACTION_STATUS, COMMON_ACTIONS, TWIN_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: AsyncStateObject<GetAllTwinListResponse> = {
  data: { data: [], count: 0 },
  isLoading: false,
  status: APP_ACTION_STATUS.INITIAL,
  error: undefined
}

const twinListReducer = (state = INITIAL_STATE, action: Action<GetAllTwinListResponse>) => {
  switch (action.type) {
    case TWIN_ACTIONS.GET_ALL_TWINS + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.LOADING,
        error: undefined
      }
    case TWIN_ACTIONS.GET_ALL_TWINS + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: APP_ACTION_STATUS.SUCCESS,
        data: action.data
      }
    case TWIN_ACTIONS.GET_ALL_TWINS + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.ERROR,
        error: action.error
      }
    case TWIN_ACTIONS.GET_ALL_TWINS + COMMON_ACTIONS.CLEAR:
      return INITIAL_STATE

    case TWIN_ACTIONS.GET_ALL_TWINS_LIST + COMMON_ACTIONS.REQUEST:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.LOADING,
        error: undefined
      }
    case TWIN_ACTIONS.GET_ALL_TWINS_LIST + COMMON_ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: APP_ACTION_STATUS.SUCCESS,
        data: action.data
      }
    case TWIN_ACTIONS.GET_ALL_TWINS_LIST + COMMON_ACTIONS.ERROR:
      return {
        ...state,
        isLoading: true,
        status: APP_ACTION_STATUS.ERROR,
        error: action.error
      }
    case TWIN_ACTIONS.GET_ALL_TWINS_LIST + COMMON_ACTIONS.CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}

export default twinListReducer
