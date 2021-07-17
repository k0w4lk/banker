import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../store/reducers/profileReducer";
import { firebase } from "./../firebase";

export const AuthContext = createContext();

const Auth = (props) => {
  const [user, setUser] = useState("");
  const [isCheckingForUser, setIsCheckingForUser] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsCheckingForUser(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        dispatch(setUserId(user.uid));
      } else {
        setUser("");
      }
      setIsCheckingForUser(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isCheckingForUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default Auth;
