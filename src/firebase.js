import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDXABBa26lbVbv3cmr44BoMNxRXMeSaPhg',
  authDomain: 'banker-f9fc3.firebaseapp.com',
  projectId: 'banker-f9fc3',
  storageBucket: 'banker-f9fc3.appspot.com',
  messagingSenderId: '647493756567',
  appId: '1:647493756567:web:d08c88243400bc333b6bd2',
  databaseURL:
    'https://banker-f9fc3-default-rtdb.europe-west1.firebasedatabase.app/',
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();

export { firebase };
