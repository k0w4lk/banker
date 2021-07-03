import { firebase } from './../../firebase';

const ADD_CLIENT = 'ADD_CLIENT';
const GET_CLIENTS = 'GET_CLIENTS';
const IS_CLIENTS_LOADING_STATUS = 'IS_CLIENTS_LOADING_STATUS';
const SET_FILTERED_CLIENTS = 'SET_FILTERED_CLIENTS';
const SET_FILTER_STATUS = 'SET_FILTER_STATUS';

const initialState = {
  clients: {},
  isClientsLoading: true,
  isFilter: false,
};

const setFilterStatus = (status) => ({
  type: SET_FILTER_STATUS,
  payload: {
    status,
  },
});

const setClient = (clientId, data) => ({
  type: ADD_CLIENT,
  payload: {
    clientId,
    data,
  },
});

const setFilteredClients = (data) => ({
  type: SET_FILTERED_CLIENTS,
  payload: {
    clients: data,
  },
});

const getClients = (data) => ({
  type: GET_CLIENTS,
  payload: {
    clients: { ...data },
  },
});

const setIsClientsLoadingStatus = (status) => ({
  type: IS_CLIENTS_LOADING_STATUS,
  payload: {
    status,
  },
});

export const addClient = (data) => (dispatch) => {
  const clientsRef = firebase.database().ref(`/clients`).push();
  const clientId = clientsRef.key;
  clientsRef
    .set({
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      birthdate: data.birthdate,
      sex: data.sex,
      work: data.work,
      id: data.id,
      phone: data.phone,
      email: data.email,
      address: data.address,
    })
    .then(() => {
      dispatch(setClient(clientId, data));
    });
};

export const showClients = (data) => (dispatch) => {
  dispatch(setIsClientsLoadingStatus(true));
  firebase
    .database()
    .ref(`/clients/`)
    .once('value', (val) => {
      dispatch(getClients({ ...val.val() }));
    })
    .then(() => {
      dispatch(setIsClientsLoadingStatus(false));
    });
  dispatch(setFilterStatus(false));
};

export const setFilter = (data) => (dispatch) => {
  dispatch(setFilteredClients(data));
  dispatch(setFilterStatus(true));
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLIENT:
      return {
        ...state,
        clients: {
          ...state.clients,
          [action.payload.clientId]: action.payload.data,
        },
      };
    case GET_CLIENTS:
      return { ...state, clients: action.payload.clients };
    case IS_CLIENTS_LOADING_STATUS:
      return {
        ...state,
        isClientsLoading: action.payload.status,
      };
    case SET_FILTERED_CLIENTS:
      return {
        ...state,
        clients: action.payload.clients,
      };
    case SET_FILTER_STATUS: {
      return {
        ...state,
        isFilter: action.payload.status,
      };
    }
    default:
      return state;
  }
};

export default clientsReducer;
