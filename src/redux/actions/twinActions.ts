/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type Action } from '../../interfaces'
import { type GetAllTwinListRequestParam } from '../../interfaces/twins'
import { COMMON_ACTIONS, TWIN_ACTIONS } from '../../utils/constants'

const allTwinList = (param: GetAllTwinListRequestParam): Action<GetAllTwinListRequestParam> => {
  return { type: TWIN_ACTIONS.GET_ALL_TWINS + COMMON_ACTIONS.REQUEST, data: param }
}
const GetallTwinList = (param: GetAllTwinListRequestParam): Action<GetAllTwinListRequestParam> => {
  return { type: TWIN_ACTIONS.GET_ALL_TWINS_LIST + COMMON_ACTIONS.REQUEST, data: param }
}

export const twinAction = {
  allTwinList,
  GetallTwinList
}
