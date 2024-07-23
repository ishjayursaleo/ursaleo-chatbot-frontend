import { combineReducers } from 'redux'
import { type TwinState } from '../../../interfaces/twins'
import twinListReducer from './twinList'

const twinReducer = combineReducers<TwinState>({
  allTwinList: twinListReducer
})

export default twinReducer
