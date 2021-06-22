import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import calendarReminderReducer from './reducers/calendarReminderReducer';
import profileReducer from './reducers/profileReducer';

const store = createStore(
  combineReducers({
    currentUser: profileReducer,
    calendar: calendarReminderReducer,
  }),
  applyMiddleware(thunk)
);

window.store = store;
export default store;
