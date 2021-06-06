import firebase from 'firebase';

export const authApi = {
  authentication(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
};
