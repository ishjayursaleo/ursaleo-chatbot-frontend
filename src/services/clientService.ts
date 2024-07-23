/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type AxiosResponse } from 'axios'
import {
  type ClientDetailsRequestParams,
  type ClientCreateRequestPayload,
  type ClientCreateResponsePayload,
  type ClientDetailsResponse,
  type ClientListResponse,
  type ClientListRequestParams,
  type SelectedClientsDeleteResponse
} from '../interfaces'
import { axiosPrivateAPI } from '.'
export interface ClientDeleteIdsProps {
  clientIds: string[]
}
const createClient = async (payload: ClientCreateRequestPayload):
Promise<AxiosResponse<ClientCreateResponsePayload>> => {
  return await axiosPrivateAPI.post('/api/client', payload)
}
const getClientDetails = async (params: ClientDetailsRequestParams):
Promise<AxiosResponse<ClientDetailsResponse>> => {
  return await axiosPrivateAPI.get(`/api/entitlement/list?clientId=${params.clientId}&include=client`)
}

const getClientList = async (params?: ClientListRequestParams):
Promise<AxiosResponse<ClientListResponse>> => {
  const page = params?.queryParam.page ?? 1
  const pageSize = params?.queryParam.pageSize ?? 1000
  const isUlAdminScreen = params?.queryParam.isUlAdminScreen ?? false
  return await axiosPrivateAPI.get(`/api/client/list?page=${page}&pageSize=${pageSize}&include=twinCount&include=userCount&isUlAdminScreen=${isUlAdminScreen}`)
}

const deleteSelectedClients = async (payload: string[]): Promise<AxiosResponse<SelectedClientsDeleteResponse>> => {
  const deleteIDs: any = {
    clientIds: payload
  }
  return await axiosPrivateAPI.delete('/api/client/delete/bulk', { data: deleteIDs })
}

export const clientService = {
  createClient,
  getClientDetails,
  getClientList,
  deleteSelectedClients
}
