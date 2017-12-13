import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers/reducer';

/* eslint-disable no-underscore-dangle */

const loggerMiddleware = createLogger();

const middleware = [thunkMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


if (process.env.NODE_ENV !== 'production') {
    middleware.push(loggerMiddleware);
}

/* const storeDefault =createStore(
rootReducer,
preloadedState,
applyMiddleware(...middleware)
); */


export default function configureStore(preloadedState, historyMiddleware) {
    middleware.push(historyMiddleware);
    return createStore(rootReducer, preloadedState,
        composeEnhancers(
            applyMiddleware(...middleware)
        ));
/* eslint-enable */
}
