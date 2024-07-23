import { type WS_EVENT_TYPE } from '../utils/constants'

export interface SocketData {
  message: {
    id: string
    clientId: string
    twinId: string
    userId: string
    twinVersionId: string
    name: string
    extension: string
    documentType: string
    filePath: string
    updatedAt: string
    createdAt: string
    downloadableUrl?: string
    downloadedFile?: string
    event: {
      id: string
      type: WS_EVENT_TYPE
      documentEventId: string
      updatedAt: string
      createdAt: string
    }
  }
}

export interface SocketModalData {
  id: string
  clientId: string
  twinId: string
  userId: string
  twinVersionId: string
  name: string
  extension: string
  documentType: string
  filePath: string
  updatedAt: string
  createdAt: string
  downloadableUrl?: string
  downloadedFile?: string
  event: {
    id: string
    type: WS_EVENT_TYPE
    documentEventId: string
    updatedAt: string
    createdAt: string
  }
}
