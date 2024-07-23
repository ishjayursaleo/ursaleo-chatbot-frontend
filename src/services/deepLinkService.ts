/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type AxiosResponse } from 'axios'
import { axiosPrivateAPI } from '.'
import { type DeepLinkResponse, type DeepLinkRequest } from '../interfaces'

const createDeepLink = async (payload: DeepLinkRequest):
Promise<AxiosResponse<DeepLinkResponse>> => {
  return await axiosPrivateAPI.post('/api/token/create-deep-link', payload)
}

export const deepLinkService = {
  createDeepLink
}
