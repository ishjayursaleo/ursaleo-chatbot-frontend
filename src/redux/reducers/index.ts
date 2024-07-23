import { combineReducers } from 'redux'
import { type AppState } from '../../interfaces/app'
import sideBarItemReducer from './sideBars/sideBarItem'
import alertReducer from './alert'
import profileReducer from './profile'
import clientReducer from './client'
import entitlementReducer from './entitlement'
import twinReducer from './twin'
import userReducer from './user'
import twinConfigReducer from './newTwinConfiguration'

const rootReducer = combineReducers<AppState>({
  sideBar: sideBarItemReducer,
  alerts: alertReducer,
  profile: profileReducer,
  client: clientReducer,
  entitlement: entitlementReducer,
  twin: twinReducer,
  user: userReducer,
  twinConfigurations: twinConfigReducer
})

export default rootReducer
