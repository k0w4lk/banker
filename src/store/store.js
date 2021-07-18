import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import calendarReminderReducer from "./reducers/calendarReminderReducer";
import clientsReducer from "./reducers/clientsReducer";
import profileReducer from "./reducers/profileReducer";
import actionsReducer from "./reducers/actionsReducer";
import clientReducer from "./reducers/clientReducer";
import authReducer from "./reducers/authReducer";

const store = createStore(
  combineReducers({
    currentUser: profileReducer,
    calendar: calendarReminderReducer,
    clients: clientsReducer,
    actions: actionsReducer,
    client: clientReducer,
    auth: authReducer,
  }),
  applyMiddleware(thunk)
);

window.store = store;
export default store;
