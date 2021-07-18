import { useContext } from 'react';
import { Route } from 'react-router';
import { AuthContext } from '../../context/authContext';
import Preloader from './../common/Preloader';
import Clients from './Clients';
import ClientPage from './Clients/ClientPage';
import styles from './Main.module.scss';
import Navigation from './Navigation';
import Profile from './Profile';
import StartPage from './StartPage';

const Main = () => {
  const { user } = useContext(AuthContext);
  return user ? (
    <div className={styles.main__wrapper}>
      <Navigation />
      <Route exact path="/main" render={() => <StartPage />} />
      <Route exact path="/main/profile" render={() => <Profile />} />
      <Route exact path="/main/clients" render={() => <Clients />} />
      <Route
        path="/main/clients/:clientId/data"
        render={() => <ClientPage />}
      />
    </div>
  ) : (
    <Preloader />
  );
};

export default Main;
