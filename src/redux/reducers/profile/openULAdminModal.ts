import { PROFILE_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: boolean = true

const openULAdminModalReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case PROFILE_ACTIONS.OPEN_MODAL: {
      const updatedState = !state
      return updatedState
    }
    default:
      return state
  }
}

export default openULAdminModalReducer
