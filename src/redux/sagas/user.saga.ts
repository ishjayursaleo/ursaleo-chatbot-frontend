/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  type UserCreateResponsePayload,
  type Action,
  type UserCreateRequestPayload,
  type AlertMessage,
  type GetClientAdminListRequestParam,
  type GetClientAdminListResponsePayload
} from '../../interfaces'
import { type AxiosResponse } from 'axios'
import { ALERT_ACTIONS, ALERT_VARIANT, COMMON_ACTIONS, USER_ACTIONS } from '../../utils/constants'
import { UserService } from '../../services/user.service'

function * createUser (action: Action<UserCreateRequestPayload>) {
  try {
    const response: AxiosResponse<UserCreateResponsePayload> = yield call(
      UserService.createUser, action.data)
    yield put<Action<UserCreateResponsePayload>>({
      type: USER_ACTIONS.CREATE_USER + COMMON_ACTIONS.SUCCESS,
      data: response.data
    })
    const alert: AlertMessage = {
      message: 'User created successfully',
      options: {
        variant: ALERT_VARIANT.SUCCESS,
        autoHideDuration: 5000
      }
    }
    yield put<Action<AlertMessage>>({
      type: ALERT_ACTIONS.TRIGGER_ALERT_MESSAGE,
      data: alert
    })
  } catch (e) {
    yield put<Action<UserCreateResponsePayload>>({
      type: USER_ACTIONS.CREATE_USER + COMMON_ACTIONS.ERROR,
      data: {
        id: '',
        firstName: '',
        lastName: '',
        createdAt: '',
        updatedAt: '',
        email: '',
        enabled: false,
        emailVerified: false
      },
      error: e as string
    })
    const alert: AlertMessage = {
      message: e as string,
      options: {
        variant: ALERT_VARIANT.ERROR
      }
    }
    yield put<Action<AlertMessage>>({
      type: ALERT_ACTIONS.TRIGGER_ALERT_MESSAGE,
      data: alert
    })
  }
}

function * getClientAdminList (action: Action<GetClientAdminListRequestParam>) {
  try {
    const response: AxiosResponse<GetClientAdminListResponsePayload> = yield call(
      UserService.getClientAdminList, action.data)
    yield put<Action<GetClientAdminListResponsePayload>>({
      type: USER_ACTIONS.GET_CLIENT_ADMIN_LIST + COMMON_ACTIONS.SUCCESS,
      data: response.data
    })
  } catch (e) {
    yield put<Action<GetClientAdminListResponsePayload>>({
      type: USER_ACTIONS.GET_CLIENT_ADMIN_LIST + COMMON_ACTIONS.ERROR,
      data: {
        id: '',
        firstName: '',
        lastName: '',
        createdAt: '',
        updatedAt: '',
        email: '',
        enabled: false,
        emailVerified: false
      },
      error: e as string
    })
  }
}
function * userSagas () {
  yield takeEvery(USER_ACTIONS.CREATE_USER + COMMON_ACTIONS.REQUEST, createUser)
  yield takeEvery(USER_ACTIONS.GET_CLIENT_ADMIN_LIST + COMMON_ACTIONS.REQUEST, getClientAdminList)
}

export default userSagas
