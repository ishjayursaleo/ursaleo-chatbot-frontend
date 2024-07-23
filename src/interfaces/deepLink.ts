export interface DeepLinkRequest {
  userId: string
  clientId: string
  twinId: string
  twinVersionId?: string
}

export interface DeepLinkResponse {
  id: string
  deepLink: string
  clientId: string
  validated: true
  twinId: string
  userId: string
  twinVersionId?: string
}
