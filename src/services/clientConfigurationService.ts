import { type AxiosResponse } from 'axios'
import {
  type ClientConfigurationListParams,
  type ClientConfigurationCreateRequestPayload,
  type ClientConfigurationCreateResponse,
  type ClientConfigurationGetResponse
} from '../interfaces/clientConfiguration'
import { axiosPrivateAPI } from '.'

const createConfiguration = async (clientId: string, payload: ClientConfigurationCreateRequestPayload):
Promise<AxiosResponse<ClientConfigurationCreateResponse>> => {
  return await axiosPrivateAPI.post(`/api/client-integration-source-config/client/${clientId}`, payload)
}

const getConfigurations = async (params: ClientConfigurationListParams):
Promise<AxiosResponse<ClientConfigurationGetResponse[]>> => {
  let url = `/api/client-integration-source-config/client/${params.pathParams.clientId}`
  if (params.queryParams != null) {
    url += `?include=${params.queryParams.include}`
  }
  return await axiosPrivateAPI.get(url)
}
// const getConfigurationsByTypeAndClientId = async (params: ClientConfigurationByTypeAndClientIdParams):
// Promise<AxiosResponse<ClientConfigurationDetailedResponse>> => {
//   return await axiosPrivateAPI.get(`/api/configuration/${params.type}/${params.clientId}`)
// }
const editConfiguration = async (clientId: string, payload: ClientConfigurationCreateRequestPayload):
Promise<AxiosResponse<ClientConfigurationCreateResponse>> => {
  return await axiosPrivateAPI.put(`/api/client-integration-source-config/client/${clientId}`, payload)
}

export const clientConfigurationService = {
  createConfiguration,
  getConfigurations,
  editConfiguration
  // getConfigurationsByTypeAndClientId,
  // editConfiguration
}
