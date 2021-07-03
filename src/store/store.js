import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import calendarReminderReducer from './reducers/calendarReminderReducer';
import clientsReducer from './reducers/clientsReducer';
import profileReducer from './reducers/profileReducer';
import actionsReducer from './reducers/actionsReducer';

const store = createStore(
  combineReducers({
    currentUser: profileReducer,
    calendar: calendarReminderReducer,
    clients: clientsReducer,
    actions: actionsReducer,
  }),
  applyMiddleware(thunk)
);

window.store = store;
export default store;
