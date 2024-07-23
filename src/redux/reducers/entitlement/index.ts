import { combineReducers } from 'redux'
import { type EntitlementState } from '../../../interfaces/entitlements'
import myEntitlementListReducer from './myEntitlementListReducer'
import allClientListReducer from './allClientListReducer'
import addEntitlementBulkReducer from './addEntitlementBulk'

const entitlementReducer = combineReducers<EntitlementState>({
  myEntitlements: myEntitlementListReducer,
  allClientList: allClientListReducer,
  addEntitlementBulk: addEntitlementBulkReducer
})

export default entitlementReducer
