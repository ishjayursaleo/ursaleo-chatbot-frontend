import { combineReducers } from 'redux'
import { type ClientState } from '../../../interfaces'
import createClientReducer from './createClient'
import selectedClientDetailsReducer from './getSelectedClientDetails'

const clientReducer = combineReducers<ClientState>({
  createClient: createClientReducer,
  selectedClientDetails: selectedClientDetailsReducer
})

export default clientReducer
