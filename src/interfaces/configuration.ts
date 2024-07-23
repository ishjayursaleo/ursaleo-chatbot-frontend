export interface ConfigurationCreateRequestPayload {
  type: string
  clientId: string
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

export interface ConfigurationDetailedResponse {
  type: string
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
export interface ConfigurationCreateResponse {
  type: string
  clientId: string
  isSecret: boolean
  value: {
    enc: string
    keyHash: string
  }
  createdAt: string
  updatedAt: string
}

export interface ConfigurationByTypeAndClientIdParams {
  clientId: string
  type: string
}
