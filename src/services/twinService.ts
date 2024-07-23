/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type AxiosResponse } from 'axios'
import { axiosPrivateAPI } from '.'
import {
  type GetAllTwinListResponse,
  type GetAllTwinListRequestParam,
  type TwinVersionHistoryParams,
  type AllTwinsVersionHistoryResponse,
  type DownloadFileParams,
  type TwinCreateRequestPayload,
  type TwinCreateResponsePayload,
  type TwinVersionDeletePathParams,
  type TwinDeletePathParams,
  type TwinDeleteResponse,
  type TwinVersionResponse,
  type TwinVersionRequest,
  type CreateTwinVersionRequest,
  type CreateTwinVersionResponse,
  type GetTwinByIdParam,
  type TwinDetails,
  type TwinUpdateRequestPayload
} from '../interfaces/twins'

const getAllTwinList = async (params: GetAllTwinListRequestParam):
Promise<AxiosResponse<GetAllTwinListResponse>> => {
  // const page = params.queryParams?.page ?? 1
  // const pageSize = params.queryParams?.pageSize ?? 3

  // return await axiosPrivateAPI.get(`/api/client/${params.clientId}/twin/list?page=${page}&&pageSize=${pageSize}`)
  const { clientId, queryParams } = params

  let url = `/api/client/${clientId}/twin/list`

  if (queryParams != null) {
    const { page, pageSize, include } = queryParams
    if (page !== undefined && pageSize !== undefined) {
      url += `?page=${page}&pageSize=${pageSize}&include=${include}`
    } else if (page !== undefined) {
      url += `?page=${page}&include=${include}`
    } else if (pageSize !== undefined) {
      url += `?pageSize=${pageSize}&include=${include}`
    } else {
      url += `?include=${include}`
    }
  }

  return await axiosPrivateAPI.get(url)
}
const getAllTwinListWithClintId = async (params: GetAllTwinListRequestParam):
Promise<AxiosResponse<GetAllTwinListResponse>> => {
  return await axiosPrivateAPI.get(`/api/client/${params.clientId}/twin/list`)
}

const getTwinById = async (params: GetTwinByIdParam):
Promise<AxiosResponse<TwinDetails>> => {
  const { clientId, twinId } = params.path
  return await axiosPrivateAPI.get(`/api/client/${clientId}/twin/${twinId}`)
}

const getAllTwinVersionHistory = async (params: TwinVersionHistoryParams):
Promise<AxiosResponse<AllTwinsVersionHistoryResponse>> => {
  const clientID = params.clientId
  const twinId = params.twinId
  const page = params.queryParams?.page ?? 1
  const pageSize = params.queryParams?.pageSize ?? 1000
  return await axiosPrivateAPI.get(`/api/client/${clientID}/twin/${twinId}/version/list?page=${page}&pageSize=${pageSize}`)
}

const downloadTwin = async (params: DownloadFileParams): Promise<AxiosResponse<any>> => {
  const queryParam = params.queryParams.path
  const clientId = params.pathParams.clientId
  const valueURL = `/api/client/${params.pathParams.clientId}/docs/download?path=${queryParam}`
  return await axiosPrivateAPI.get(`/api/client/${params.pathParams.clientId}/docs/download?path=${queryParam}`)
  // need to update this link /api/document/...
}

const createTwin = async (payload: TwinCreateRequestPayload):
Promise<AxiosResponse<TwinCreateResponsePayload>> => {
  return await axiosPrivateAPI.post(`/api/client/${payload.pathParams.clientId}/twin`, payload.bodyParams)
}

const updateTwin = async (payload: TwinUpdateRequestPayload):
Promise<AxiosResponse<TwinCreateResponsePayload>> => {
  const { pathParams, bodyParams } = payload
  return await axiosPrivateAPI.put(`/api/client/${pathParams.clientId}/twin/${pathParams.id}`, bodyParams)
}

const deleteTwinVersion = async (params: TwinVersionDeletePathParams):
Promise<AxiosResponse<boolean>> => {
  return await axiosPrivateAPI.delete(`/api/client/${params.pathParams.clientId}/twin/${params.pathParams.twinId}/version/${params.pathParams.id}`)
}
const deleteTwin = async (params: TwinDeletePathParams):
Promise<AxiosResponse<TwinDeleteResponse>> => {
  const deleteIDs: any = {
    twinIds: params.bodyParams.twinIds
  }
  return await axiosPrivateAPI.delete(`/api/client/${params.pathParams.clientId}/twin/delete/bulk`, { data: deleteIDs })
}

const updateTwinVersion = async (payload: TwinVersionRequest): Promise<AxiosResponse<TwinVersionResponse>> => {
  return await axiosPrivateAPI.put(`/api/client/${payload.pathParams.clientId}/twin/${payload.pathParams.twinId}`, payload.bodyParams)
}
const createTwinVersion = async (payload: CreateTwinVersionRequest): Promise<AxiosResponse<CreateTwinVersionResponse>> => {
  const headers: any = payload?.isMultipart
    ? {
        'Content-Type': 'multipart/form-data'
      }
    : {
        'Content-Type': 'application/json'
      }

  return await axiosPrivateAPI.post(`/api/client/${payload.pathParams.clientId}/twin/${payload.pathParams.twinId}/version`, payload.bodyParams, { headers })
}
export const twinService = {
  getAllTwinList,
  getAllTwinVersionHistory,
  downloadTwin,
  createTwin,
  getAllTwinListWithClintId,
  deleteTwinVersion,
  deleteTwin,
  updateTwinVersion,
  createTwinVersion,
  getTwinById,
  updateTwin
}
