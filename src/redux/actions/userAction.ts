/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type GetClientAdminListRequestParam, type UserCreateRequestPayload } from '../../interfaces'
import { USER_ACTIONS, COMMON_ACTIONS } from '../../utils/constants'

const addUser = (payload: UserCreateRequestPayload) => {
  return { type: USER_ACTIONS.CREATE_USER + COMMON_ACTIONS.REQUEST, data: payload }
}
const addUserClear = () => {
  return { type: USER_ACTIONS.CREATE_USER + COMMON_ACTIONS.CLEAR, data: null }
}
const getClientAdminList = (payload: GetClientAdminListRequestParam) => {
  return { type: USER_ACTIONS.GET_CLIENT_ADMIN_LIST + COMMON_ACTIONS.REQUEST, data: payload }
}
const storeUserData = (payload: { userId: string, userName: string, email: string }) => {
  return { type: USER_ACTIONS.STORE_USER + COMMON_ACTIONS.SUCCESS, data: payload }
}
export const userActions = {
  addUser,
  addUserClear,
  getClientAdminList,
  storeUserData
}
