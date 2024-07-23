export interface GetAllTwinListRequestParam {
  clientId: string
  queryParams?: {
    page?: number
    pageSize?: number
    include: string
  }
}

export interface TwinDetails {
  id: string
  name: string
  description: string
  clientId: string
  defaultVersionId: string
  createdAt: string
  updatedAt: string
  defaultVersion?: DefaultVersion
  isSelected: boolean
  versions: TwinVersion[]
}

export interface TwinVersion {
  accessUrl: string
  createdAt: string
  description: string
  id: string
  modelFilePath: string
  name: string
  twinId: string
  updatedAt: string
}

export interface DefaultVersion extends TwinVersion { }

export interface GetAllTwinListResponse {
  data: TwinDetails[]
  count: number
}
export interface TwinState {
  // allTwinList: GetAllTwinListResponse
  allTwinList: any
  // twinList: any
}

export interface TwinListErrorResponse {
  error: string
}

export interface TwinVersionHistoryParams {
  clientId: string
  twinId: string
  queryParams?: {
    page?: number
    pageSize?: number
  }
}

export interface TwinVersionHistory {
  id: string
  twinId: string
  name: string
  description: string
  modelFilePath: string
  accessUrl: string
  createdAt: string
  updatedAt: string
}

export interface AllTwinsVersionHistoryResponse {
  data: TwinVersionHistory[]
  count: number
}

export interface DownloadFileParams {
  pathParams: {
    clientId: string | undefined
  }
  queryParams: {
    path: string
  }
}
export interface TwinCreateRequestPayload {
  pathParams: {
    clientId: string | undefined
  }
  bodyParams: {
    name: string
    description: string
  }
}
export interface TwinUpdateRequestPayload {
  pathParams: {
    clientId: string | undefined
    id: string | undefined
  }
  bodyParams: {
    name: string
    description: string
    defaultVersionId: string
  }
}
export interface TwinCreateResponsePayload {
  id: string
  name: string
  description: string
  clientId: string
  defaultVersionId: string
  createdAt: string
  updatedAt: string
}

export interface TwinVersionDeletePathParams {
  pathParams: {
    id: string
    clientId: string
    twinId: string
  }
}
export interface TwinDeletePathParams {
  bodyParams: {
    twinIds: string[]
  }
  pathParams: {
    clientId: string
  }
}

export interface TwinDeleteResponse {
  message: string | boolean
}

export interface TwinVersionRequest {
  pathParams: {
    clientId: string
    twinId: string
  }
  bodyParams: {
    defaultVersionId: string
  }
}

export interface TwinVersionResponse {
  id: string
  clientId: string
  defaultVersionId: string
  createdAt: string
  updatedAt: string
}

export interface CreateTwinVersionRequest {
  pathParams: {
    clientId: string
    twinId: string
  }
  bodyParams: {
    name: string
    description: string
    accessUrl: string
    modelFile?: File | null // Optional property
  }
  isMultipart: boolean
}

export interface CreateTwinVersionResponse {
  id: string
  twinId: string
  name: string
  description: string
  modelFilePath: string
  accessUrl: string
  defaultVersionId: string
  createdAt: string
  updatedAt: string
}

export interface GetTwinByIdParam {
  path: {
    clientId: string
    twinId: string
  }
  query?: {
    include: string
  }
}
