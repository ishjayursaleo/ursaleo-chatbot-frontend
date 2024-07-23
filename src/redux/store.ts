import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const logger = createLogger()
const sagaMiddleWare = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger as any, sagaMiddleWare)))
sagaMiddleWare.run(rootSaga)
export default store
