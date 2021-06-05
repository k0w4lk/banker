import { Route } from 'react-router-dom';
import './App.css';
import Authorization from './components/Authorization';
import Registration from './components/Registration';
import Main from './components/Main';
import Profile from './components/Main/Profile';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <Authorization />} />
      <Route path="/registration" render={() => <Registration />} />
      <Route exact path="/main" render={() => <Main />} />
      <Route exact path="/main/profile" render={() => <Profile />} />
    </div>
  );
}

export default App;
