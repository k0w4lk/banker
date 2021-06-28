import { firebase } from './../../firebase';

const ADD_CLIENT = 'ADD_CLIENT';
const GET_CLIENTS = 'GET_CLIENTS';
const IS_CLIENTS_LOADING_STATUS = 'IS_CLIENTS_LOADING_STATUS';

const initialState = {
  clients: {},
  isClientsLoading: true,
};

const setClient = (clientId, data) => ({
  type: ADD_CLIENT,
  payload: {
    clientId,
    data,
  },
});

const getClients = (data) => ({
  type: GET_CLIENTS,
  payload: {
    clients: { ...data },
  },
});

const setIsClientsLoadingStatus = () => ({
  type: IS_CLIENTS_LOADING_STATUS,
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
      console.log(val.val());
      dispatch(getClients({ ...val.val() }));
    })
    .then(() => {
      dispatch(setIsClientsLoadingStatus(false));
    });
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
    default:
      return state;
  }
};

export default clientsReducer;
