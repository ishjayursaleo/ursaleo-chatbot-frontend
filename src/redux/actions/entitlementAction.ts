/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type Action } from '../../interfaces'
import { type addEntitlementBulkPayload, type GetAllClientListRequestParam } from '../../interfaces/entitlements'
import { COMMON_ACTIONS, ENTITLEMENT_ACTIONS } from '../../utils/constants'

const myEntitlementList = (): Action<null> => {
  return { type: ENTITLEMENT_ACTIONS.GET_MY_ENTITLEMENT + COMMON_ACTIONS.REQUEST, data: null }
}

const allClientList = (param: GetAllClientListRequestParam): Action<GetAllClientListRequestParam> => {
  return { type: ENTITLEMENT_ACTIONS.GET_ALL_CLIENTS + COMMON_ACTIONS.REQUEST, data: param }
}
const allClientListClear = (): Action<null> => {
  return { type: ENTITLEMENT_ACTIONS.GET_ALL_CLIENTS + COMMON_ACTIONS.CLEAR, data: null }
}
const addEntitlementBulk = (param: addEntitlementBulkPayload): Action<addEntitlementBulkPayload> => {
  return { type: ENTITLEMENT_ACTIONS.ADD__ENTITLEMENT_BULK + COMMON_ACTIONS.REQUEST, data: param }
}
const addEntitlementBulkClear = (): Action<null> => {
  return { type: ENTITLEMENT_ACTIONS.ADD__ENTITLEMENT_BULK + COMMON_ACTIONS.CLEAR, data: null }
}
export const entitlementAction = {
  myEntitlementList,
  allClientList,
  allClientListClear,
  addEntitlementBulk,
  addEntitlementBulkClear
}
