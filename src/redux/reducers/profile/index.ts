import { combineReducers } from 'redux'
import profileUserReducer from './makeAdmin'
import { type ProfileState } from '../../../interfaces/profile'
import openULAdminModalReducer from './openULAdminModal'

const profileReducer = combineReducers<ProfileState>({
  profileUser: profileUserReducer,
  openULAdminModal: openULAdminModalReducer
})

export default profileReducer
