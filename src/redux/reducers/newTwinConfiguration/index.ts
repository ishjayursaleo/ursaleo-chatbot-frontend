import { combineReducers } from 'redux'
import twinConfigListReducer from './twinConfigList'
import { type TwinConfigurationState } from '../../../interfaces/twinConfiguration'

const twinConfigReducer = combineReducers<TwinConfigurationState>({
  twinConfigList: twinConfigListReducer
})

export default twinConfigReducer
