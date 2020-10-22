import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { routerMiddleware } from 'connected-react-router'

import preloadedState from './preloadedState.js'

import getRootReducer from '../reducers/reducer.js'

/* eslint-disable no-underscore-dangle */

export default function configureStore(history) {
	const loggerMiddleware = createLogger()
	const middleware = [thunkMiddleware]
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

	if (process.env.NODE_ENV !== 'production') {
		middleware.push(loggerMiddleware)
	}

	const rootReducer = getRootReducer(history)

	middleware.push(routerMiddleware(history))

	return createStore(
		rootReducer,
		preloadedState,
		composeEnhancers(applyMiddleware(...middleware))
	)
	/* eslint-enable */
}
