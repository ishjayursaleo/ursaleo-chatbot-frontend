import { SIDEBAR_ACTIONS } from '../../../utils/constants'
import { type Action } from '../../../interfaces'

const INITIAL_STATE: number = 1

const sideBarItemReducer = (state = INITIAL_STATE, action: Action<number>) => {
  switch (action.type) {
    case SIDEBAR_ACTIONS.SET_ACTIVE_ITEM:
      return action.data

    default:
      return state
  }
}

export default sideBarItemReducer
