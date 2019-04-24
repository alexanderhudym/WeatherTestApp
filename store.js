import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import weatherReducer from './weatherReducer';
const reducers = {
    weatherReducer,
};
const middleware = [thunk, logger];


export default function configureStore() {
    return createStore(
        combineReducers(reducers),
        applyMiddleware(...middleware)
    );
}
