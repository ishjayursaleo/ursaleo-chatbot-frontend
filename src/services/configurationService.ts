import { type AxiosResponse } from 'axios'
import {
  type ConfigurationDetailedResponse,
  type ConfigurationByTypeAndClientIdParams,
  type ConfigurationCreateRequestPayload,
  type ConfigurationCreateResponse
} from '../interfaces/configuration'
import { axiosPrivateAPI } from '.'

const createConfiguration = async (payload: ConfigurationCreateRequestPayload):
Promise<AxiosResponse<ConfigurationCreateResponse>> => {
  return await axiosPrivateAPI.post('/api/configuration', payload)
}

const getConfigurationsByTypeAndClientId = async (params: ConfigurationByTypeAndClientIdParams):
Promise<AxiosResponse<ConfigurationDetailedResponse>> => {
  return await axiosPrivateAPI.get(`/api/configuration/${params.type}/${params.clientId}`)
}
const editConfiguration = async (
  params: ConfigurationByTypeAndClientIdParams,
  payload: ConfigurationCreateRequestPayload
):
Promise<AxiosResponse<ConfigurationCreateResponse>> => {
  return await axiosPrivateAPI.put(`/api/configuration/${params.type}/${params.clientId}`, payload)
}

export const configurationService = {
  createConfiguration,
  getConfigurationsByTypeAndClientId,
  editConfiguration
}
