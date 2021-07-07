import { firebase } from './../../firebase';

const SET_CLIENT_DATA = 'SET_CLIENT_DATA';
const GET_CLIENT_DATA = 'GET_CLIENT_DATA';
const SET_CLIENT_LOADING_STATUS = 'SET_CLIENT_LOADING_STATUS';

const initialState = {
  client: {
    surname: '',
    name: '',
    patronymic: '',
    birthdate: '',
    sex: '',
    id: '',
    work: '',
    phone: '',
    email: '',
    address: '',
  },
  isClientLoading: true,
};

const setIsClientLoadingStatus = (status) => ({
  type: SET_CLIENT_LOADING_STATUS,
  payload: {
    status,
  },
});

const getClientData = (data) => ({
  type: GET_CLIENT_DATA,
  payload: {
    data,
  },
});

const setClientData = (data) => ({
  type: SET_CLIENT_DATA,
  payload: {
    data,
  },
});

export const getCurrentClientData = (data) => (dispatch) => {
  dispatch(setIsClientLoadingStatus(true));
  firebase
    .database()
    .ref(`/clients/${data}`)
    .once('value', (val) => {
      dispatch(getClientData({ ...val.val() }));
    })
    .then(() => {
      dispatch(setIsClientLoadingStatus(false));
    });
};

export const setCurrentClientData = (data) => (dispatch) => {
  console.log(data);
  firebase.database().ref(`/clients/${data.id}`).set(data.client);
  dispatch(setClientData(data.client));
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENT_DATA:
      return {
        ...state,
        client: action.payload.data,
      };
    case GET_CLIENT_DATA:
      return {
        ...state,
        client: action.payload.data,
      };
    case SET_CLIENT_LOADING_STATUS:
      return {
        ...state,
        isClientLoading: action.payload.status,
      };
    default:
      return state;
  }
};

export default clientReducer;
