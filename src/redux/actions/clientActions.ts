/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type ClientDetailsRequestParams, type ClientCreateRequestPayload, type Action } from '../../interfaces'
import { CLIENT_ACTIONS, COMMON_ACTIONS } from '../../utils/constants'

const addClient = (payload: ClientCreateRequestPayload) => {
  return { type: CLIENT_ACTIONS.CREATE_CLIENT + COMMON_ACTIONS.REQUEST, data: payload }
}
const selectedClientDetails = (params: ClientDetailsRequestParams) => {
  return { type: CLIENT_ACTIONS.GET_SELECTED_CLIENT_DETAILS + COMMON_ACTIONS.REQUEST, data: params }
}

const clearSelectedClientDetails = (): Action<null> => {
  return { type: CLIENT_ACTIONS.GET_SELECTED_CLIENT_DETAILS + COMMON_ACTIONS.CLEAR, data: null }
}

const clearCreateClient = (): Action<null> => {
  return { type: CLIENT_ACTIONS.CREATE_CLIENT + COMMON_ACTIONS.CLEAR, data: null }
}
export const clientActions = {
  addClient,
  selectedClientDetails,
  clearSelectedClientDetails,
  clearCreateClient
}
