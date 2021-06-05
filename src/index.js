import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyDXABBa26lbVbv3cmr44BoMNxRXMeSaPhg',
  authDomain: 'banker-f9fc3.firebaseapp.com',
  projectId: 'banker-f9fc3',
  storageBucket: 'banker-f9fc3.appspot.com',
  messagingSenderId: '647493756567',
  appId: '1:647493756567:web:d08c88243400bc333b6bd2',
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
