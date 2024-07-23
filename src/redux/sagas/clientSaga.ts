/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  type ClientCreateResponsePayload,
  type Action,
  type ClientCreateRequestPayload,
  type AlertMessage,
  type ClientDetailsRequestParams,
  type ClientDetailsResponse,
  type ClientDetailsErrorResponse
} from '../../interfaces'
import { type AxiosResponse } from 'axios'
import {
  ALERT_ACTIONS,
  ALERT_VARIANT,
  CLIENT_ACTIONS,
  COMMON_ACTIONS
} from '../../utils/constants'
import { clientService } from '../../services/clientService'

function * createClient (action: Action<ClientCreateRequestPayload>) {
  try {
    const response: AxiosResponse<ClientCreateResponsePayload> = yield call(
      clientService.createClient, action.data)
    yield put<Action<ClientCreateResponsePayload>>({
      type: CLIENT_ACTIONS.CREATE_CLIENT + COMMON_ACTIONS.SUCCESS,
      data: response.data
    })
    const alert: AlertMessage = {
      message: 'Client created successfully',
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
    yield put<Action<ClientCreateResponsePayload>>({
      type: CLIENT_ACTIONS.CREATE_CLIENT + COMMON_ACTIONS.ERROR,
      data: { id: '', name: '', description: '', createdAt: '', updatedAt: '' },
      error: e as string
    })
  }
}

/*
This Saga is used to keep the Selected Client Details when selected from UL admin Home List
*/

function * getClientDetails (action: Action<ClientDetailsRequestParams>) {
  try {
    const response: Awaited<ReturnType<typeof clientService.getClientDetails>> =
      yield call(clientService.getClientDetails, action.data)
    yield put<Action<ClientDetailsResponse>>({
      type: CLIENT_ACTIONS.GET_SELECTED_CLIENT_DETAILS + COMMON_ACTIONS.SUCCESS,
      data: response.data
    })
  } catch (e) {
    yield put<Action<ClientDetailsErrorResponse>>({
      type: CLIENT_ACTIONS.GET_SELECTED_CLIENT_DETAILS + COMMON_ACTIONS.ERROR,
      data: { message: e as string },
      error: e as string
    })
  }
}

function * clientSagas () {
  yield takeEvery(CLIENT_ACTIONS.CREATE_CLIENT + COMMON_ACTIONS.REQUEST, createClient)
  yield takeEvery(CLIENT_ACTIONS.GET_SELECTED_CLIENT_DETAILS + COMMON_ACTIONS.REQUEST, getClientDetails)
}

export default clientSagas
