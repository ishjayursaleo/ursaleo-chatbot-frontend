/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  type Action
} from '../../interfaces'
import { COMMON_ACTIONS, TWIN_ACTIONS } from '../../utils/constants'
import { twinService } from '../../services/twinService'
import {
  type GetAllTwinListResponse,
  type GetAllTwinListRequestParam,
  type TwinListErrorResponse,
  type DownloadFileParams
} from '../../interfaces/twins'

function * getAllTwinList (action: Action<GetAllTwinListRequestParam>) {
  try {
    const response: Awaited<ReturnType<typeof twinService.getAllTwinList>> =
    yield call(twinService.getAllTwinList, action.data)
    yield put<Action<GetAllTwinListResponse>>({
      type: TWIN_ACTIONS.GET_ALL_TWINS + COMMON_ACTIONS.SUCCESS,
      data: { data: response.data.data, count: response.data.count }
    })
  } catch (e) {
    yield put<Action<TwinListErrorResponse>>({
      type: TWIN_ACTIONS.GET_ALL_TWINS + COMMON_ACTIONS.ERROR,
      data: { error: e as string },
      error: e as string
    })
  }
}

function * getAllTwinListWithClintId (action: Action<GetAllTwinListRequestParam>) {
  try {
    const response: Awaited<ReturnType<typeof twinService.getAllTwinList>> =
    yield call(twinService.getAllTwinListWithClintId, action.data)
    yield put<Action<GetAllTwinListResponse>>({
      type: TWIN_ACTIONS.GET_ALL_TWINS_LIST + COMMON_ACTIONS.SUCCESS,
      data: { data: response.data.data, count: response.data.count }
    })
  } catch (e) {
    yield put<Action<TwinListErrorResponse>>({
      type: TWIN_ACTIONS.GET_ALL_TWINS_LIST + COMMON_ACTIONS.ERROR,
      data: { error: e as string },
      error: e as string
    })
  }
}
function * downloadTwin (action: Action<DownloadFileParams>) {
  try {
    const response: Awaited<ReturnType<typeof twinService.downloadTwin>> =
    yield call(twinService.downloadTwin, action.data)
    yield put<Action<any>>({
      type: TWIN_ACTIONS.DOWNLOAD_TWIN + COMMON_ACTIONS.SUCCESS,
      data: { data: response.data }
    })
  } catch (e) {
    yield put<Action<TwinListErrorResponse>>({
      type: TWIN_ACTIONS.DOWNLOAD_TWIN + COMMON_ACTIONS.ERROR,
      data: { error: e as string },
      error: e as string
    })
  }
}
function * twinSagas () {
  yield takeEvery(TWIN_ACTIONS.GET_ALL_TWINS + COMMON_ACTIONS.REQUEST, getAllTwinList)
  yield takeEvery(TWIN_ACTIONS.GET_ALL_TWINS_LIST + COMMON_ACTIONS.REQUEST, getAllTwinListWithClintId)
  yield takeEvery(TWIN_ACTIONS.DOWNLOAD_TWIN + COMMON_ACTIONS.REQUEST, downloadTwin)
}

export default twinSagas
