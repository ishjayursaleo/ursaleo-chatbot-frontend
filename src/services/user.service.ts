/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type AxiosResponse } from 'axios'
import {
  type UserCreateResponsePayload,
  type UserCreateRequestPayload,
  type GetClientAdminListRequestParam,
  type GetClientAdminListResponsePayload,
  type GetAllULAdminResponse,
  type GetAllULAdminParams,
  type GetNonULAdminListResponsePayload
} from '../interfaces'
import { axiosPrivateAPI } from '.'

const createUser = async (payload: UserCreateRequestPayload):
Promise<AxiosResponse<UserCreateResponsePayload>> => {
  return await axiosPrivateAPI.post('/api/user', payload)
}
const getClientAdminList = async (payload: GetClientAdminListRequestParam):
Promise<AxiosResponse<GetClientAdminListResponsePayload>> => {
  return await axiosPrivateAPI.get(`/api/user/list?searchText=${payload.searchText}`)
}

/* Get List of UL Admins */
const getAllULAdmins = async (params: GetAllULAdminParams): Promise<AxiosResponse<GetAllULAdminResponse>> => {
  const page = params.queryParams?.page ?? 1
  const pageSize = params.queryParams?.pageSize ?? 3
  const searchText = params.queryParams.searchText
  if (searchText === '' || searchText === undefined) {
    return await axiosPrivateAPI.get(`/api/user/ul-admins?page=${page}&pageSize=${pageSize}`)
  } else {
    return await axiosPrivateAPI.get(`/api/user/ul-admins?searchText=${params.queryParams.searchText}&page=${page}&pageSize=${pageSize}`)
  }
}
/* Get List of Non UL Users - check the TYPE names when revamping */
const getAllNonULUsers = async (payload?: GetClientAdminListRequestParam): Promise<AxiosResponse<GetNonULAdminListResponsePayload>> => {
  const searchText = payload?.searchText
  if (searchText !== undefined && searchText !== '') {
    return await axiosPrivateAPI.get('/api/user/non-uladmin-users')
  }
  return await axiosPrivateAPI.get(`/api/user/non-uladmin-users?searchText=${searchText}`)
}
export const UserService = {
  createUser,
  getClientAdminList,
  getAllULAdmins,
  getAllNonULUsers
}
