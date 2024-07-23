import { SIDEBAR_ACTIONS } from '../../utils/constants'

const setActiveMenuItem = (params: number) => {
  return { type: SIDEBAR_ACTIONS.SET_ACTIVE_ITEM, data: params }
}

export const sidebarActions = {
  setActiveMenuItem
}
