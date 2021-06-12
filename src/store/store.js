import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import profileReducer, { setUser } from './reducers/profileReducer';
import registrationReducer, { addUser } from './reducers/registrationReducer';

const store = createStore(
  combineReducers({
    registeredUsers: registrationReducer,
    currentUser: profileReducer,
  }),
  applyMiddleware(thunk)
);

// store.dispatch(addUser('qw,', 'qweqw', '12312', 'qwdas'));
store.dispatch(setUser('qw,', 'qweqw', '123112', 'qwda222s'));
// store.subscribe(() => store.getState().registeredUsers);

window.store = store;
export default store;
