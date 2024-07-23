export interface TwinConfigurationState {
  twinConfigList: any
}

export interface TwinConfigurationCreateRequestPayload {
  id?: string
  twinId?: string
  integrationSourceId: string
  isSecret: boolean
  value?: {
    type: string
    basePath?: string
    config?: {
      grant_type: string
      client_id: string
      client_secret: string
      procore_base_url: string
      company_id: string
      project_id: string
    }
  }
}

export interface TwinConfigurationDetailedResponse {
  id: string
  integrationSourceId: string
  twinId: string
  isSecret: boolean
  value: {
    type: string
    basePath: string
    config: {
      grant_type: string
      client_id: string
      client_secret: string
      procore_base_url: string
      company_id: string
      project_id: string
    }
  }
  createdAt: string
  updatedAt: string
}
export interface TwinConfigurationCreateResponse {
  id: string
  integrationSourceId: string
  twinId: string
  isSecret: boolean
  value: {
    enc: string
    keyHash: string
  }
  createdAt: string
  updatedAt: string
}

export interface TwinConfigurationByTypeAndTwinIdParams {
  twinId: string
  integrationSourceId: string
}

export interface TwinConfigurationListParams {
  pathParams: {
    twinId: string
  }
  queryParams?: {
    include: string
  }
}

export interface TwinConfigurationGetResponse {
  id: string
  integrationSourceId: string
  twinId: string
  isSecret: boolean
  value: {
    type: string
    basePath: string
    config: {
      grant_type: string
      client_id: string
      client_secret: string
      procore_base_url: string
      company_id: string
      project_id: string
    }
  }
  createdAt: string
  updatedAt: string
  integrationSource?: {
    id: string
    source: string
    description: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
}
