/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type AxiosResponse } from 'axios'
import { axiosPrivateAPI } from '.'
import {
  type GetAllClientListResponse,
  type GetAllClientListRequestParam,
  type MyEntitlementListResponse,
  type EntitlementBulkResponse,
  type addEntitlementBulkPayload,
  type GetAllUsersByClientRequestParam,
  type GetAllUsersByClientResponse,
  type DeleteUserEntitlementParams,
  type UserEntitlementUpdate,
  type UserEntitlementUpdateResponse,
  type AddEntitlementPayload,
  type deleteUlAdminEntitlementBulkParams
} from '../interfaces/entitlements'

const getMyEntitlements = async ():
Promise<AxiosResponse<MyEntitlementListResponse[]>> => {
  return await axiosPrivateAPI.get('/api/entitlement/myEntitlements')
}

const getAllClientList = async (param: GetAllClientListRequestParam):
Promise<AxiosResponse<GetAllClientListResponse>> => {
  const page = param.queryParam.page ?? 1
  const pageSize = param.queryParam.pageSize ?? 4
  return await axiosPrivateAPI.get(`/api/entitlement/list?userId=${param.queryParam.userId}&page=${page}&pageSize=${pageSize}&include=${param.queryParam.include}`)
}

const addEntitlement = async (payload: AddEntitlementPayload): Promise<AxiosResponse<MyEntitlementListResponse>> => {
  return await axiosPrivateAPI.post('/api/entitlement', payload)
}

const addEntitlementBulk = async (param: addEntitlementBulkPayload):
Promise<AxiosResponse<EntitlementBulkResponse>> => {
  return await axiosPrivateAPI.post('/api/entitlement/bulk', param)
}

const getAllUsersByClient = async (param: GetAllUsersByClientRequestParam):
Promise<AxiosResponse<GetAllUsersByClientResponse>> => {
  const page = param.queryParams?.page ?? 1
  const pageSize = param.queryParams?.pageSize ?? 1000
  const userSearchText = param.queryParams?.userSearchText
  if (userSearchText !== null) {
    return await axiosPrivateAPI.get(`/api/entitlement/users-by-clientId?clientId=${param.pathParam.clientId}&page=${page}&pageSize=${pageSize}&userSearchText=${userSearchText}`)
  } else {
    return await axiosPrivateAPI.get(`/api/entitlement/users-by-clientId?clientId=${param.pathParam.clientId}&page=${page}&pageSize=${pageSize}`)
  }
}

/**
This API for delete user from Manage Entitlement User List
 */
const deleteUserFromEntitlementList = async (params: DeleteUserEntitlementParams):
Promise<AxiosResponse<boolean>> => {
  return await axiosPrivateAPI.delete('/api/entitlement/delete/bulk', { data: params.bodyParams })
}

const userEntitlementUpdate = async (params: UserEntitlementUpdate):
Promise<AxiosResponse<UserEntitlementUpdateResponse>> => {
  return await axiosPrivateAPI.put('/api/entitlement/edit/bulk', params)
}

const deleteUlAdminUlAdminEntitlement = async (params: deleteUlAdminEntitlementBulkParams): Promise<AxiosResponse<boolean>> => {
  return await axiosPrivateAPI.delete('/api/entitlement/ul-admin/delete/bulk', { data: params })
}
export const entitlementService = {
  addEntitlement,
  getMyEntitlements,
  getAllClientList,
  addEntitlementBulk,
  getAllUsersByClient,
  deleteUserFromEntitlementList,
  userEntitlementUpdate,
  deleteUlAdminUlAdminEntitlement
}
