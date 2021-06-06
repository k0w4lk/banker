import { combineReducers, createStore } from 'redux';
import authReducer from './reducers/authReducer.js';

const reducers = combineReducers({ authReducer });

const store = createStore(reducers);
window.store = store;
export default store;
