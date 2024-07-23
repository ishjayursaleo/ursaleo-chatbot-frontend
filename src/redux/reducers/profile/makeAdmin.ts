import { PROFILE_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: string = 'USER'

const profileUserReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case PROFILE_ACTIONS.MAKE_ADMIN: {
      const updatedState = state === 'USER' ? 'ADMIN' : 'USER'
      return updatedState
    }
    default:
      return state
  }
}

export default profileUserReducer
