
export interface UserState {
  createUser: any
  getClientAdminList: any
  storeUser: any
}
export interface UserCreateResponsePayload {
  id: string
  email: string
  firstName: string
  lastName: string
  enabled: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}
export interface UserCreateRequestPayload {
  email: string
  enabled: true
}
export interface GetClientAdminListRequestParam {
  searchText?: string
}
export interface GetClientAdminListResponsePayload {
  id: string
  email: string
  firstName: string
  lastName: string
  enabled: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface GetNonULAdminListResponsePayload {
  data: GetClientAdminListResponsePayload[]
}

export interface GetAllULAdminResponse {
  data: UserCreateResponsePayload[]
  count: 0
}

export interface GetAllULAdminParams {
  queryParams: {
    searchText?: string | null
    page?: number
    pageSize?: number
  }
}

export interface AdminListTableTypes {
  id: string
  email: string
  firstName: string
  lastName: string
  enabled: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
  isSelected: boolean
}
