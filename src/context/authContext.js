import { createContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import firebase from 'firebase';

export const AuthContext = createContext();

const Auth = (props) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const onEmailInputHandler = (e) => setEmail(e.target.value);

  const onPaswordInputHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(err.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) props.history.push('/main');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-alreadyIn-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        props.history.push('/main');
      } else {
        setUser('');
        props.history.push('/');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        emailError,
        passwordError,
        onEmailInputHandler,
        onPaswordInputHandler,
        handleLogin,
        handleRegistration,
        handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default withRouter(Auth);
