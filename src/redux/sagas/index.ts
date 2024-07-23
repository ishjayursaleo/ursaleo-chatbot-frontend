import { all } from 'redux-saga/effects'
import clientSagas from './clientSaga'
import entitlementSagas from './entitlementSaga'
import twinSagas from './twinSaga'
import userSagas from './user.saga'
export default function * rootSaga () {
  yield all([
    clientSagas(),
    entitlementSagas(),
    twinSagas(),
    userSagas()
  ])
}
