import { firebase } from './../../firebase';

const ADD_CLIENT = 'ADD_CLIENT';

const initialState = {};

const setClient = () => ({
  type: ADD_CLIENT,
});

export const addClient = (data) => (dispatch) => {
  console.log(data);
  firebase
    .database()
    .ref(`/clients`)
    .push()
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
      dispatch(setClient());
    });
};

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLIENT:
      return { ...state };

    default:
      return state;
  }
};

export default clientsReducer;
