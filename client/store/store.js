import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
import DevTools from '../helpers/DevTools'

const logger = createLogger()

const enhancers = [
  applyMiddleware(ReduxThunk),
  DevTools.instrument()
]

const Store = createStore(rootReducer, {}, compose(...enhancers))

export default Store
