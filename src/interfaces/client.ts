/* eslint-disable max-len */

export interface ClientCreateRequestPayload {
  name: string
  description: string
}

export interface ClientCreateResponsePayload {
  id: string
  name: string
  description: string
  updatedAt: string
  createdAt: string
}

export interface ClientCreateErrorResponse {
  error: string
}
export interface ClientState {
  createClient: any
  selectedClientDetails: any
}

export interface ClientDetailsRequestParams {
  clientId: string
}
export interface ClientListRequestParams {
  queryParam: {
    page?: number
    pageSize?: number
    searchText?: string
    isUlAdminScreen?: boolean
  }
}

export interface ClientDetail {
  id: string
  userId: string
  userGroupId: string
  clientId: string
  twinId: string
  role: string
  createdAt: string
  updatedAt: string
  client?: ClientCreateResponsePayload // Interface name is not good but same responce body when refactor use common name in feature
}

export interface ClientDetailsResponse {
  data: ClientDetail[]
  count: number
}
export interface ClientDetailsErrorResponse {
  message: string
}

/*
To show the all client against user in UL Admin Home
*/
export interface ClientListResponse {
  data: ClientDetail[]
  count: number
  totalTwinCount: number
  totalUserCount: number
}

export interface SelectedClientsDeleteResponse {
  message: string | boolean
}
