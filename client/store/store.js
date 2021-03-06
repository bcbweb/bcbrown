import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'
import DevTools from '../helpers/DevTools'

const logger = createLogger()

const middleWare = [ReduxThunk]

if (Meteor.settings.public.production === 'false') middleWare.push(logger)

const enhancers = [
  applyMiddleware(...middleWare),
  DevTools.instrument()
]

const Store = createStore(rootReducer, {}, compose(...enhancers))

export default Store
