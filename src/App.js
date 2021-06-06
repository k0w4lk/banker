import { Route } from 'react-router-dom';
import './App.css';
import Authorization from './components/Authorization';
import Registration from './components/Registration';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <Authorization />} />
      <Route path="/registration" render={() => <Registration />} />
      <Route path="/main" render={() => <Main />} />
    </div>
  );
}

export default App;
