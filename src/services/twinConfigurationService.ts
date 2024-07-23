import { type AxiosResponse } from 'axios'
import {
  type TwinConfigurationListParams,
  type TwinConfigurationCreateRequestPayload,
  type TwinConfigurationCreateResponse,
  type TwinConfigurationGetResponse
} from '../interfaces/twinConfiguration'
import { axiosPrivateAPI } from '.'

const createConfiguration = async (twinId: string, payload: TwinConfigurationCreateRequestPayload):
Promise<AxiosResponse<TwinConfigurationCreateResponse>> => {
  return await axiosPrivateAPI.post(`/api/twin-integration-source-config/twin/${twinId}`, payload)
}

const getConfigurations = async (params: TwinConfigurationListParams):
Promise<AxiosResponse<TwinConfigurationGetResponse[]>> => {
  let url = `/api/twin-integration-source-config/twin/${params.pathParams.twinId}`
  if (params.queryParams != null) {
    url += `?include=${params.queryParams.include}`
  }
  return await axiosPrivateAPI.get(url)
}

const editConfiguration = async (twinId: string, payload: TwinConfigurationCreateRequestPayload):
Promise<AxiosResponse<TwinConfigurationCreateResponse>> => {
  return await axiosPrivateAPI.put(`/api/twin-integration-source-config/twin/${twinId}`, payload)
}

export const twinConfigurationService = {
  createConfiguration,
  getConfigurations,
  editConfiguration
}
