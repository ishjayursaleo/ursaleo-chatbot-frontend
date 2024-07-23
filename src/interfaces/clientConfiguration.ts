export interface ClientConfigurationCreateRequestPayload {
  id?: string
  clientId: string
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
    }
  }
}

export interface ClientConfigurationDetailedResponse {
  id: string
  integrationSourceId: string
  clientId: string
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
    }
  }
  createdAt: string
  updatedAt: string
}
export interface ClientConfigurationCreateResponse {
  id: string
  integrationSourceId: string
  clientId: string
  isSecret: boolean
  value: {
    enc: string
    keyHash: string
  }
  createdAt: string
  updatedAt: string
}

export interface ClientConfigurationByTypeAndClientIdParams {
  clientId: string
  integrationSourceId: string
}

export interface ClientConfigurationListParams {
  pathParams: {
    clientId: string
  }
  queryParams?: {
    include: string
  }
}

export interface ClientConfigurationGetResponse {
  id: string
  integrationSourceId: string
  clientId: string
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
    }
  }
  createdAt: string
  updatedAt: string
  integrationSource: {
    id: string
    source: string
    description: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
}
