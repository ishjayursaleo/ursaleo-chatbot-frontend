import { PROFILE_ACTIONS } from '../../utils/constants'

const makeAdmin = () => {
  return { type: PROFILE_ACTIONS.MAKE_ADMIN }
}

const openModal = () => {
  return { type: PROFILE_ACTIONS.OPEN_MODAL }
}

export const profileActions = {
  makeAdmin,
  openModal
}
