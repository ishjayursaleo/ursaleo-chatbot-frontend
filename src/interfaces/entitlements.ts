/*
Please carefully check the Interface conventions when creating new interfaces
*/
export interface MyEntitlementListResponse {
  id: string
  role: string
  userId: string
  userGroupId: string
  clientId: string
  twinId: string
  createdAt: string
  updatedAt: string
}

export interface EntitlementState {
  myEntitlements: any
  allClientList: any
  addEntitlementBulk: any
}

export interface MyEntitlementListErrorResponse {
  error: string
}

export interface GetAllClientListRequestParam {
  queryParam: {
    userId: string
    include: string
    page?: number
    pageSize?: number
  }
}
export interface addEntitlementBulkPayload {
  emails: string[]
  clientId?: string
  role: string
  twinIds?: string[]
  isUlAdmin?: boolean
}
export interface AddEntitlementPayload {
  userId: string
  userGroupId?: string
  clientId?: string | null
  role: string
  twinId?: string | null
}

export interface IndividualClient {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface GetClientDetails {
  id: string
  role: string
  userId: string
  userGroupId: string
  clientId: string
  twinId: string
  createdAt: string
  updatedAt: string
  client: IndividualClient
}

export interface GetAllClientListResponse {
  data: GetClientDetails[]
  count: number
}

interface data {
  id: string
  userId: string
  userGroupId: string
  clientId: string
  twinId: string
  role: string
  createdAt: string
  updatedAt: string
}

interface ErrorItem {
  email: string
  message: string
}

interface MessageItem {
  email: string
  message: string
}

export interface EntitlementBulkResponse {
  data: data[]
  errors: ErrorItem[]
  messages: MessageItem[]
}

export interface GetAllUsersByClientRequestParam {
  pathParam: {
    clientId: string
  }
  queryParams?: {
    page?: number
    pageSize?: number
    userSearchText?: string | null
  }
}

/*
This bellow all types are related to fetch Manger User List Table Data
*/
export interface InnerUserDetails {
  id: string
  email: string
  firstName: string
  lastName: string
  enabled: boolean
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Twin {
  id: string
  name: string
  description: string
  clientId: string
  defaultVersionId: string
  createdAt: string
  updatedAt: string
}
export interface InnerClients {
  id: string
  name: string
  description: string
  twins: Twin[]

}
export interface UsersArray {
  userId: string
  role: string
  clients: InnerClients[]
  twins?: []
  user: InnerUserDetails
}

export interface GetAllUsersByClientResponse {
  data: UsersArray[]
  count: string // have convert to number due query
}

/*
This Above all types are related to fetch Manger User List Table Data
*/

export interface DeleteUserEntitlementParams {
  bodyParams: {
    userId: string
    clientId: string
    role: string
  }
}

export interface UserEntitlementUpdate {
  userId: string
  userGroupId?: string
  clientId: string
  twinIds: string[]
  role: string
}

export interface UserEntitlementUpdateResponse {
  message: string
}

export interface deleteUlAdminEntitlementBulkParams {
  userIds: string[]
}
