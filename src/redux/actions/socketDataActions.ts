import { type SocketModalData } from '../../interfaces'
import { SOCKET_ACTIONS } from '../../utils/constants'

const storeSocketData = (payload: SocketModalData) => {
  return { type: SOCKET_ACTIONS.STORE_WS_DATA, data: payload }
}

export const socketDataActions = {
  storeSocketData
}
