import { combineReducers } from 'redux'
import { type AlertState } from '../../../interfaces'
import alertListReducer from './alertList'

const alertReducer = combineReducers<AlertState>({
  alertList: alertListReducer
})

export default alertReducer
