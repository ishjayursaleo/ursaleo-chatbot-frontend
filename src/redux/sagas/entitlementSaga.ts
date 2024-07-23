/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  type AlertMessage,
  type Action
} from '../../interfaces'
import { ALERT_ACTIONS, ALERT_VARIANT, COMMON_ACTIONS, ENTITLEMENT_ACTIONS } from '../../utils/constants'
import { entitlementService } from '../../services/entitlementService'
import {
  type addEntitlementBulkPayload,
  type EntitlementBulkResponse,
  type GetAllClientListRequestParam,
  type GetAllClientListResponse,
  type MyEntitlementListErrorResponse,
  type MyEntitlementListResponse
} from '../../interfaces/entitlements'

function * getMyEntitlements (action: Action<null>) {
  try {
    const response: Awaited<ReturnType<typeof entitlementService.getMyEntitlements>> =
    yield call(entitlementService.getMyEntitlements)
    yield put<Action<MyEntitlementListResponse[]>>({
      type: ENTITLEMENT_ACTIONS.GET_MY_ENTITLEMENT + COMMON_ACTIONS.SUCCESS,
      data: response.data
    })
  } catch (e) {
    yield put<Action<MyEntitlementListErrorResponse>>({
      type: ENTITLEMENT_ACTIONS.GET_MY_ENTITLEMENT + COMMON_ACTIONS.ERROR,
      data: { error: e as string },
      error: e as string
    })
  }
}

function * getAllClientList (action: Action<GetAllClientListRequestParam>) {
  try {
    const response: Awaited<ReturnType<typeof entitlementService.getAllClientList>> =
    yield call(entitlementService.getAllClientList, action.data)
    yield put<Action<GetAllClientListResponse>>({
      type: ENTITLEMENT_ACTIONS.GET_ALL_CLIENTS + COMMON_ACTIONS.SUCCESS,
      data: response.data
    })
  } catch (e) {
    yield put<Action<MyEntitlementListErrorResponse>>({
      type: ENTITLEMENT_ACTIONS.GET_ALL_CLIENTS + COMMON_ACTIONS.ERROR,
      data: { error: e as string },
      error: e as string
    })
  }
}

function * addEntitlementBulk (action: Action<addEntitlementBulkPayload>) {
  try {
    const response: Awaited<ReturnType<typeof entitlementService.addEntitlementBulk>> =
    yield call(entitlementService.addEntitlementBulk, action.data)
    yield put<Action<EntitlementBulkResponse>>({
      type: ENTITLEMENT_ACTIONS.ADD__ENTITLEMENT_BULK + COMMON_ACTIONS.SUCCESS,
      data: response.data
    })
    const alert: AlertMessage = {
      message: 'Invitation Sent.',
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
    yield put<Action<MyEntitlementListErrorResponse>>({
      type: ENTITLEMENT_ACTIONS.ADD__ENTITLEMENT_BULK + COMMON_ACTIONS.ERROR,
      data: { error: e as string },
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
function * entitlementSagas () {
  yield takeEvery(ENTITLEMENT_ACTIONS.GET_MY_ENTITLEMENT + COMMON_ACTIONS.REQUEST, getMyEntitlements)
  yield takeEvery(ENTITLEMENT_ACTIONS.GET_ALL_CLIENTS + COMMON_ACTIONS.REQUEST, getAllClientList)
  yield takeEvery(ENTITLEMENT_ACTIONS.ADD__ENTITLEMENT_BULK + COMMON_ACTIONS.REQUEST, addEntitlementBulk)
}

export default entitlementSagas
