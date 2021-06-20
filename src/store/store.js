import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from './reducers/profileReducer';

const store = createStore(
  combineReducers({
    currentUser: profileReducer,
  }),
  applyMiddleware(thunk)
);

window.store = store;
export default store;
