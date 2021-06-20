import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import Authorization from './components/Authorization';
import Registration from './components/Registration';
import Main from './components/Main';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/main" /> : <Authorization />}
        </Route>
        <Route exact path="/registration">
          {user ? <Redirect to="/main" /> : <Registration />}
        </Route>
        <Route path="/main">{user ? <Main /> : <Redirect to="/" />}</Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
