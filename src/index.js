import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';
import Auth from './context/authContext';
import { Provider } from 'react-redux';
import { setUser } from './store/reducers/profileReducer';
import { addUser } from './store/reducers/registrationReducer';

firebase.initializeApp({
  apiKey: 'AIzaSyDXABBa26lbVbv3cmr44BoMNxRXMeSaPhg',
  authDomain: 'banker-f9fc3.firebaseapp.com',
  projectId: 'banker-f9fc3',
  storageBucket: 'banker-f9fc3.appspot.com',
  messagingSenderId: '647493756567',
  appId: '1:647493756567:web:d08c88243400bc333b6bd2',
  databaseURL:
    'https://banker-f9fc3-default-rtdb.europe-west1.firebasedatabase.app/',
});

// store.dispatch(addUser('qw,', 'qweqw', '123112', 'qwda222s'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth>
          <App />
        </Auth>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
