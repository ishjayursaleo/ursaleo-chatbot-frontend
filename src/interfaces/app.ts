import { type AlertState } from './alert'
import { type ClientState } from './client'
import { type EntitlementState } from './entitlements'
import { type ProfileState } from './profile'
// import { type SocketModalData } from './socketData'
import { type TwinConfigurationState } from './twinConfiguration'
import { type TwinState } from './twins'
import { type UserState } from './user'

export interface AppState {
  alerts: AlertState
  sideBar: number
  profile: ProfileState
  client: ClientState
  entitlement: EntitlementState
  twin: TwinState
  user: UserState
  twinConfigurations: TwinConfigurationState
}
