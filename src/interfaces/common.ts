import { type APP_ACTION_STATUS } from '../utils/constants'

export interface AsyncStateObject<T> {
  isLoading: boolean
  data: T
  status: APP_ACTION_STATUS | null
  error?: string | null
}

export interface Action<T> {
  type: string
  data: T
  error?: string
}
export interface ErrorResponse {
  message: string
}
