/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type TwinConfigurationCreateRequestPayload } from '../../interfaces/twinConfiguration'
import { TWIN_CONFIG_ACTIONS } from '../../utils/constants'

const addConfig = (param: TwinConfigurationCreateRequestPayload): any => {
  return { type: TWIN_CONFIG_ACTIONS.ADD_TWIN_CONFIG, data: param }
}
const editConfig = (param: TwinConfigurationCreateRequestPayload): any => {
  return { type: TWIN_CONFIG_ACTIONS.UPDATE_TWIN_CONFIG, data: param }
}
const clearConfigs = () => {
  return { type: TWIN_CONFIG_ACTIONS.CLEAR_TWIN_CONFIGS }
}

export const twinConfigAction = {
  addConfig,
  editConfig,
  clearConfigs
}
