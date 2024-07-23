/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { type Action } from '../../../interfaces'
import { type TwinConfigurationCreateRequestPayload } from '../../../interfaces/twinConfiguration'
import { TWIN_CONFIG_ACTIONS } from '../../../utils/constants'

const INITIAL_STATE: { configs: Array<TwinConfigurationCreateRequestPayload | null> } = {
  configs: [null]
}

const twinConfigListReducer = (state = INITIAL_STATE, action: Action<TwinConfigurationCreateRequestPayload>) => {
  switch (action.type) {
    case TWIN_CONFIG_ACTIONS.GET_ALL_TWIN_CONFIGS:
      return { ...state }
    case TWIN_CONFIG_ACTIONS.ADD_TWIN_CONFIG:
      return {
        ...state,
        configs: [action.data, ...state.configs]
      }
    case TWIN_CONFIG_ACTIONS.UPDATE_TWIN_CONFIG: {
      const existingConfig = state.configs.find(config => config?.id === action.data.id)
      if (existingConfig != null) {
        existingConfig.integrationSourceId = action.data.integrationSourceId
        existingConfig.isSecret = action.data.isSecret
        existingConfig.value = action.data.value
      }
      return { ...state }
    }
    case TWIN_CONFIG_ACTIONS.CLEAR_TWIN_CONFIGS:
      return INITIAL_STATE
    default:
      return state
  }
}

export default twinConfigListReducer
