import { combineReducers } from 'redux'
import { type UserState } from '../../../interfaces'
import creteUserReducer from './creteUser'
import getClientAdminListReducer from './getClientAdminList'
import storeUserReducer from './storeUser'
const userReducer = combineReducers<UserState>({
  createUser: creteUserReducer,
  getClientAdminList: getClientAdminListReducer,
  storeUser: storeUserReducer
})

export default userReducer
